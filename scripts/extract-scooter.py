from collections import deque
from PIL import Image

source = Image.open('public/products/image_00011.jpg').convert('RGB')
w, h = source.size
pixels = source.load()
seen = bytearray(w * h)
queue = deque([(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)])

while queue:
    x, y = queue.popleft()
    index = y * w + x
    if seen[index]:
        continue
    red, green, blue = pixels[x, y]
    if min(red, green, blue) < 190 or max(red, green, blue) - min(red, green, blue) > 28:
        continue
    seen[index] = 1
    for next_x, next_y in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
        if 0 <= next_x < w and 0 <= next_y < h and not seen[next_y * w + next_x]:
            queue.append((next_x, next_y))

result = Image.new('RGBA', (w, h))
output = result.load()
for y in range(h):
    for x in range(w):
        red, green, blue = pixels[x, y]
        output[x, y] = (red, green, blue, 0 if seen[y * w + x] else 255)

result.save('public/scooter-hero.png', optimize=True)
print(f'Saved public/scooter-hero.png ({w}x{h})')
