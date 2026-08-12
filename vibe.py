import asyncio
import re
import json
from pathlib import Path
from urllib.parse import urljoin

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright


# =========================================================
# SETTINGS
# =========================================================

SHOP_URL = "https://tap.az/shops/vibeaz?user_id=31260552"

OUTPUT_DIR = Path("vibeaz_products")
IMAGES_DIR = OUTPUT_DIR / "images"
TXT_FILE = OUTPUT_DIR / "products.txt"

OUTPUT_DIR.mkdir(exist_ok=True)
IMAGES_DIR.mkdir(exist_ok=True)


# =========================================================
# HELPERS
# =========================================================

def clean(text):
    if not text:
        return ""

    text = text.replace("\xa0", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n[ \t]+", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def get_ad_id(url):
    """
    Например:

    https://tap.az/elanlar/.../48167387

    -> 48167387
    """

    match = re.search(
        r"/(\d+)(?:\?|#|$)",
        url
    )

    if match:
        return match.group(1)

    return ""


# =========================================================
# GET SHOP LISTINGS
# =========================================================

async def get_listing_links(page):

    print()
    print("Открываю магазин...")

    await page.goto(
        SHOP_URL,
        wait_until="domcontentloaded",
        timeout=60000
    )

    await page.wait_for_timeout(3000)

    print("Загружаю товары...")

    old_count = 0
    stable = 0

    for i in range(30):

        await page.mouse.wheel(
            0,
            3000
        )

        await page.wait_for_timeout(
            1200
        )

        count = await page.locator(
            "a[href*='/elanlar/']"
        ).count()

        print(
            f"  Прокрутка {i+1}/30 | "
            f"найдено: {count}"
        )

        if count == old_count:
            stable += 1
        else:
            stable = 0

        old_count = count

        if stable >= 4:
            break

    links = await page.locator(
        "a[href*='/elanlar/']"
    ).evaluate_all(
        """
        els => els.map(a => a.href)
        """
    )

    result = []
    seen = set()

    for url in links:

        if not url:
            continue

        url = url.split("?")[0]
        url = url.split("#")[0]

        if "/elanlar/" not in url:
            continue

        if url in seen:
            continue

        seen.add(url)
        result.append(url)

    return result


# =========================================================
# DESCRIPTION
# =========================================================

async def get_description(page, soup):

    candidates = []

    # META DESCRIPTION
    meta = soup.find(
        "meta",
        attrs={"name": "description"}
    )

    if meta:

        value = clean(
            meta.get("content", "")
        )

        if len(value) > 30:
            candidates.append(value)

    # ITEMPROP
    for element in soup.find_all(
        attrs={
            "itemprop": "description"
        }
    ):

        value = clean(
            element.get_text(
                "\n",
                strip=True
            )
        )

        if len(value) > 30:
            candidates.append(value)

    # JSON-LD
    for script in soup.find_all(
        "script",
        type="application/ld+json"
    ):

        try:

            raw = script.string

            if not raw:
                raw = script.get_text()

            data = json.loads(raw)

            objects = []

            if isinstance(data, dict):

                objects.append(data)

                graph = data.get("@graph")

                if isinstance(graph, list):
                    objects.extend(graph)

            elif isinstance(data, list):

                objects.extend(data)

            for obj in objects:

                if not isinstance(
                    obj,
                    dict
                ):
                    continue

                description = obj.get(
                    "description"
                )

                if description:

                    description = clean(
                        str(description)
                    )

                    if len(description) > 30:
                        candidates.append(
                            description
                        )

        except Exception:
            pass

    # PAGE TEXT
    try:

        text = await page.locator(
            "body"
        ).inner_text()

    except Exception:

        text = ""

    lines = []

    for line in text.splitlines():

        line = clean(line)

        if line:
            lines.append(line)

    start = -1

    for i, line in enumerate(lines):

        low = line.lower()

        if (
            "çatdırılma?" in low
            or "catdirilma?" in low
        ):

            start = i + 1
            break

    if start >= 0:

        collected = []

        for line in lines[start:]:

            low = line.lower()

            if low.startswith(
                "baxış sayı:"
            ):
                break

            if low.startswith(
                "elan nömrəsi:"
            ):
                break

            if low.startswith(
                "elanın nömrəsi:"
            ):
                break

            collected.append(line)

        candidate = clean(
            "\n".join(collected)
        )

        if len(candidate) > 30:
            candidates.append(candidate)

    if not candidates:
        return ""

    return max(
        candidates,
        key=len
    )


# =========================================================
# TITLE
# =========================================================

def get_title(soup):

    h1 = soup.find("h1")

    if h1:

        value = clean(
            h1.get_text(
                " ",
                strip=True
            )
        )

        if value:
            return value

    meta = soup.find(
        "meta",
        property="og:title"
    )

    if meta:

        return clean(
            meta.get(
                "content",
                ""
            )
        )

    return ""


# =========================================================
# PRICE
# =========================================================

def get_price(soup):

    text = soup.get_text(
        " ",
        strip=True
    )

    matches = re.findall(
        r"[\d\s.,]+\s*(?:₼|AZN)",
        text,
        re.I
    )

    if matches:
        return clean(matches[0])

    return ""


# =========================================================
# FIND ONLY GALLERY IMAGES
# =========================================================

async def get_gallery_images(
    page,
    soup,
    ad_id
):

    print()
    print(
        f"Ищу галерею объявления "
        f"{ad_id}..."
    )

    urls = []

    # -----------------------------------------------------
    # ВАЖНО:
    # НЕ берем все img страницы.
    # Сначала ищем контейнеры/элементы,
    # относящиеся к галерее.
    # -----------------------------------------------------

    selectors = [

        # типичные gallery-контейнеры
        "[class*='gallery']",
        "[class*='Gallery']",

        # photo контейнеры
        "[class*='photo']",
        "[class*='Photo']",

        # image контейнеры
        "[class*='image']",
        "[class*='Image']",

        # slider
        "[class*='slider']",
        "[class*='Slider']",

        # swiper
        ".swiper",
        "[class*='swiper']",

    ]

    # -----------------------------------------------------
    # Сначала ищем элементы, внутри которых
    # находится ID объявления или data-связь.
    # -----------------------------------------------------

    gallery_nodes = []

    for selector in selectors:

        try:

            count = await page.locator(
                selector
            ).count()

            for i in range(count):

                node = page.locator(
                    selector
                ).nth(i)

                try:

                    html = await node.evaluate(
                        """
                        el => el.outerHTML
                        """
                    )

                except Exception:
                    continue

                # Контейнер должен выглядеть
                # как часть галереи.
                low = html.lower()

                if (
                    ad_id in html
                    or "gallery" in low
                    or "swiper" in low
                    or "photo" in low
                    or "slider" in low
                ):

                    gallery_nodes.append(
                        node
                    )

        except Exception:
            pass

    # -----------------------------------------------------
    # Ищем картинки ТОЛЬКО внутри найденных блоков
    # -----------------------------------------------------

    for node in gallery_nodes:

        try:

            data = await node.locator(
                "img"
            ).evaluate_all(
                """
                imgs => imgs.map(img => ({
                    src: img.src,
                    currentSrc: img.currentSrc,
                    srcset: img.getAttribute('srcset'),
                    dataSrc: img.getAttribute('data-src'),
                    dataOriginal: img.getAttribute('data-original'),
                    dataImage: img.getAttribute('data-image')
                }))
                """
            )

        except Exception:
            continue

        for img in data:

            values = [

                img.get("currentSrc"),
                img.get("dataOriginal"),
                img.get("dataImage"),
                img.get("dataSrc"),
                img.get("src"),

            ]

            srcset = img.get(
                "srcset"
            )

            if srcset:

                for part in srcset.split(","):

                    part = part.strip()

                    if part:

                        values.append(
                            part.split()[0]
                        )

            for src in values:

                if not src:
                    continue

                src = urljoin(
                    page.url,
                    src
                )

                if not src.startswith(
                    "http"
                ):
                    continue

                low = src.lower()

                if any(x in low for x in [
                    "logo",
                    "avatar",
                    "favicon",
                    "placeholder"
                ]):
                    continue

                if src not in urls:

                    urls.append(src)

    # -----------------------------------------------------
    # JSON-LD / OG не используем как основной источник,
    # потому что нам нужны ВСЕ фото галереи.
    # -----------------------------------------------------

    # -----------------------------------------------------
    # Дополнительный поиск:
    # ссылки внутри самого первого подходящего
    # gallery-блока
    # -----------------------------------------------------

    for node in gallery_nodes:

        try:

            links = await node.locator(
                "a"
            ).evaluate_all(
                """
                els => els.map(a => ({
                    href: a.href,
                    dataImage: a.getAttribute('data-image'),
                    dataSrc: a.getAttribute('data-src')
                }))
                """
            )

        except Exception:
            continue

        for item in links:

            for key in [
                "dataImage",
                "dataSrc",
                "href"
            ]:

                src = item.get(key)

                if not src:
                    continue

                src = urljoin(
                    page.url,
                    src
                )

                low = src.lower()

                # Ссылка должна выглядеть
                # как ссылка на изображение
                if any(ext in low for ext in [
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".webp"
                ]):

                    if src not in urls:
                        urls.append(src)

    # -----------------------------------------------------
    # Удаляем дубли
    # -----------------------------------------------------

    result = []

    seen = set()

    for url in urls:

        # Некоторые URL отличаются только
        # параметрами размера.
        base = url.split("?")[0]

        if base in seen:
            continue

        seen.add(base)
        result.append(url)

    print(
        f"Галерея: найдено {len(result)} фото"
    )

    return result


# =========================================================
# DOWNLOAD IMAGE
# =========================================================

async def download_image(
    context,
    url,
    number
):

    try:

        response = await context.request.get(
            url,
            timeout=60000,
            headers={
                "Referer": "https://tap.az/",
                "Accept": (
                    "image/avif,"
                    "image/webp,"
                    "image/apng,"
                    "image/svg+xml,"
                    "image/*,*/*;q=0.8"
                )
            }
        )

        if not response.ok:

            print(
                f"      HTTP {response.status}"
            )

            return None

        body = await response.body()

        if not body:
            return None

        content_type = (
            response.headers.get(
                "content-type",
                ""
            )
            .lower()
        )

        # Проверяем сигнатуру файла
        if body.startswith(
            b"\xff\xd8\xff"
        ):

            ext = ".jpg"

        elif body.startswith(
            b"\x89PNG"
        ):

            ext = ".png"

        elif (
            body.startswith(b"RIFF")
            and b"WEBP" in body[:20]
        ):

            ext = ".webp"

        elif body.startswith(
            b"GIF8"
        ):

            ext = ".gif"

        elif "image/webp" in content_type:

            ext = ".webp"

        elif "image/png" in content_type:

            ext = ".png"

        elif (
            "image/jpeg" in content_type
            or "image/jpg" in content_type
        ):

            ext = ".jpg"

        else:

            print(
                "      Не картинка:",
                content_type
            )

            return None

        if len(body) < 1000:

            print(
                "      Слишком маленький файл"
            )

            return None

        filename = (
            f"image_{number:05d}{ext}"
        )

        path = (
            IMAGES_DIR
            / filename
        )

        path.write_bytes(body)

        print(
            f"      + {filename} "
            f"({len(body)//1024} KB)"
        )

        return filename

    except Exception as e:

        print(
            "      Ошибка:",
            e
        )

        return None


# =========================================================
# SAVE TXT
# =========================================================

def save_txt(products):

    lines = []

    for index, product in enumerate(
        products,
        1
    ):

        lines.append(
            "=" * 80
        )

        lines.append(
            f"PRODUCT {index}"
        )

        lines.append(
            "=" * 80
        )

        lines.append("")

        lines.append(
            f"Название: {product['title']}"
        )

        lines.append(
            f"Цена: {product['price']}"
        )

        lines.append(
            f"Ссылка: {product['url']}"
        )

        lines.append("")

        lines.append(
            "ФОТО:"
        )

        if product["images"]:

            for image in product["images"]:

                lines.append(
                    f"{image} = "
                    f"{product['title']}"
                )

        else:

            lines.append(
                "ФОТО НЕ НАЙДЕНЫ"
            )

        lines.append("")

        lines.append(
            "ОПИСАНИЕ:"
        )

        lines.append(
            product["description"]
        )

        lines.append("")

        lines.append(
            "НОВАЯ ЦЕНА:"
        )

        lines.append(
            "________________________"
        )

        lines.append("")

    TXT_FILE.write_text(
        "\n".join(lines),
        encoding="utf-8"
    )


# =========================================================
# MAIN
# =========================================================

async def main():

    print()
    print(
        "# VIBE AZ / TAP.AZ SCRAPER"
    )
    print()

    TXT_FILE.write_text(
        "",
        encoding="utf-8"
    )

    async with async_playwright() as p:

        browser = await p.chromium.launch(
            headless=True
        )

        context = await browser.new_context(

            viewport={
                "width": 1440,
                "height": 1000
            },

            locale="az-AZ",

            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/151.0.0.0 Safari/537.36"
            )
        )

        page = await context.new_page()

        # =================================================
        # GET PRODUCTS
        # =================================================

        links = await get_listing_links(
            page
        )

        print()
        print(
            "=" * 80
        )

        print(
            "НАЙДЕНО:",
            len(links)
        )

        print(
            "=" * 80
        )

        products = []

        image_number = 1

        # =================================================
        # PROCESS PRODUCTS
        # =================================================

        for index, url in enumerate(
            links,
            1
        ):

            print()
            print(
                f"[{index}/{len(links)}]"
            )

            ad_id = get_ad_id(
                url
            )

            print(
                "ID объявления:",
                ad_id
            )

            # -------------------------------------------------
            # OPEN
            # -------------------------------------------------

            try:

                await page.goto(
                    url,
                    wait_until="domcontentloaded",
                    timeout=60000
                )

                await page.wait_for_timeout(
                    2500
                )

            except Exception as e:

                print(
                    "Ошибка:",
                    e
                )

                continue

            soup = BeautifulSoup(
                await page.content(),
                "html.parser"
            )

            # -------------------------------------------------
            # DATA
            # -------------------------------------------------

            title = get_title(
                soup
            )

            price = get_price(
                soup
            )

            description = await get_description(
                page,
                soup
            )

            # -------------------------------------------------
            # GALLERY
            # -------------------------------------------------

            image_urls = await get_gallery_images(
                page,
                soup,
                ad_id
            )

            print()
            print(
                "Название:",
                title
            )

            print(
                "Цена:",
                price
            )

            print(
                "Фото:",
                len(image_urls)
            )

            print(
                "Описание:",
                len(description),
                "символов"
            )

            # -------------------------------------------------
            # DOWNLOAD
            # -------------------------------------------------

            downloaded = []

            for photo_index, image_url in enumerate(
                image_urls,
                1
            ):

                print(
                    f"  Фото "
                    f"{photo_index}/"
                    f"{len(image_urls)}"
                )

                filename = await download_image(
                    context,
                    image_url,
                    image_number
                )

                if filename:

                    downloaded.append(
                        filename
                    )

                    image_number += 1

            # -------------------------------------------------
            # PRODUCT
            # -------------------------------------------------

            product = {

                "title": title,

                "price": price,

                "description": description,

                "url": url,

                "images": downloaded

            }

            products.append(
                product
            )

            # -------------------------------------------------
            # SAVE TXT NOW
            # -------------------------------------------------

            save_txt(
                products
            )

            print()
            print(
                f"Сохранено фото: "
                f"{len(downloaded)}"
            )

            print(
                "products.txt обновлён."
            )

        await browser.close()

    print()
    print(
        "=" * 80
    )

    print(
        "ГОТОВО"
    )

    print(
        "=" * 80
    )

    print(
        "Объявлений:",
        len(products)
    )

    print(
        "Фотографий:",
        image_number - 1
    )

    print()
    print(
        "Фото:",
        IMAGES_DIR.resolve()
    )

    print(
        "TXT:",
        TXT_FILE.resolve()
    )


# =========================================================
# START
# =========================================================

if __name__ == "__main__":

    asyncio.run(
        main()
    )