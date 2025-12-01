import { notFound } from 'next/navigation';
import { CheckoutService } from '../../_components/checkout-service';

export type WooProduct = any;

export default async function ProductPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  const idx = Number(id);
  if (!idx || Number.isNaN(idx)) {
    return notFound();
  }

  const url = `https://greenrelife.dxmd.vn/wp-json/wc/v3/products/${idx}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Woo fetch error ${res.status}: ${text}`);
  }

  const product = await res.json() as WooProduct;

  return (
    <CheckoutService items={[product]} />
  );
}
