import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ProductDetail} from '@/components/product-detail';
import {products} from '@/data/products';
import {isInStock} from '@/lib/stock';

const isProductId = (id: string) => /^\d{1,10}$/.test(id);

export function generateStaticParams() {
  return products.map(product => ({id: String(product.id)}));
}

export async function generateMetadata({params}: {params: Promise<{id: string}>}): Promise<Metadata> {
  const {id} = await params;
  if (!isProductId(id)) return {};
  const product = products.find(item => item.id === Number(id));
  if (!product) return {};
  const description = product.description.slice(0, 160);
  return {
    title: product.name,
    description,
    alternates: {canonical: `/product/${product.id}/`},
    openGraph: {
      type: 'website',
      url: `/product/${product.id}/`,
      title: product.name,
      description,
      images: product.images[0] ? [{url: product.images[0], alt: product.name}] : [{url: '/logo.jpeg', alt: 'VIBE AZ'}],
    },
    twitter: {card: 'summary_large_image', title: product.name, description, images: [product.images[0] || '/logo.jpeg']},
  };
}

export default async function Page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  if (!isProductId(id)) return notFound();
  const product = products.find(item => item.id === Number(id));
  if (!product) return notFound();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(image => new URL(image, 'https://vibe.az').toString()),
    sku: String(product.id),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AZN',
      price: product.newPrice ?? product.price,
      availability: isInStock(product) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://vibe.az/product/${product.id}/`,
    },
  };
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html: safeJsonLd}}/><ProductDetail p={product}/></>;
}
