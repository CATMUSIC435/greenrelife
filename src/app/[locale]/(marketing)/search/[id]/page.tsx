import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProductClient from '../../_components/product-client';
import ProductReviews from '../../_components/product-reviews';
import ReviewPopup from '../../_components/review-popup';

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
    <div className="container mx-auto pt-4 pb-20">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: gallery */}
        <div className="lg:col-span-1">
          {/* show first image large, others below — client carousel handles full interaction */}
          {product.images?.length > 0
            ? (
                <div className="w-full">
                  <Image
                    src={product.images[0].src}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="h-auto w-full rounded-lg object-cover"
                    priority
                  />
                </div>
              )
            : (
                <div className="flex h-72 w-full items-center justify-center rounded-lg bg-gray-100">
                  <span className="text-gray-400">Không có hình</span>
                </div>
              )}
        </div>

        {/* Right Top: details */}
        <div className="lg:col-span-2">
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

          <div className="mb-4 flex items-center gap-4">
            <p className="text-2xl font-semibold text-red-600">
              {product.price ? `${Number(product.price).toLocaleString()} đ` : 'Liên hệ'}
            </p>

            <p className="text-sm text-gray-500">
              SKU:
              {' '}
              {product.sku || '—'}
            </p>

            <p className={`text-sm font-medium ${product.stock_status === 'instock' ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock_status === 'instock' ? 'Còn hàng' : 'Hết hàng'}
            </p>
          </div>

          {/* Short description (server-rendered) */}
          <div className="prose mb-6 max-w-none" dangerouslySetInnerHTML={{ __html: product.short_description || '' }} />

          <ProductClient product={product} />
        </div>
      </div>

      <ReviewPopup productId={product.id} />
      {/* Full description below */}
      <div className="h-screen overflow-y-scroll rounded-md py-2">
        <div className="prose mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
      </div>
      <div className="py-2">
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
}
