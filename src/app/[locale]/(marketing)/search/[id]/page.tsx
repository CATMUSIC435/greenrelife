import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProductClient from '../../_components/product-client';
import ProductReviews from '../../_components/product-reviews';
import ReviewPopup from '../../_components/review-popup';
import { FadeIn } from '@/components/ui/fade-in';
import { Package, Tag, Hash } from 'lucide-react';

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
    <div className="mx-auto max-w-6xl px-4 md:px-8 pt-8 pb-32">
      <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Left: Image Gallery */}
        <div className="lg:col-span-5 lg:col-start-1 flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-[32px] border border-border/50 bg-card/50 p-2 shadow-sm backdrop-blur-xl">
            {product.images?.length > 0 ? (
              <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-muted/20">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-muted/20">
                <span className="text-muted-foreground font-medium flex flex-col items-center gap-2">
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center">?</div>
                  Không có hình
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {product.stock_status === 'instock' ? (
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/20">
                  <Package className="mr-1.5 h-4 w-4" />
                  Còn hàng
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-600 ring-1 ring-inset ring-red-500/20">
                  <Package className="mr-1.5 h-4 w-4" />
                  Hết hàng
                </span>
              )}
              
              {product.sku && (
                <span className="inline-flex items-center rounded-full bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground ring-1 ring-inset ring-border/50">
                  <Hash className="mr-1 h-3.5 w-3.5" />
                  SKU: {product.sku}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-end gap-3">
              <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary">
                {product.price ? `${Number(product.price).toLocaleString()} ₫` : 'Liên hệ'}
              </p>
            </div>

            {/* Quantity */}
            {product.stock_quantity > 0 && (
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Tag className="h-4 w-4 text-primary/70" />
                Số lượng kho: <span className="text-foreground font-bold">{product.stock_quantity}</span>
              </div>
            )}

            {/* Short Description */}
            {product.short_description && (
              <div 
                className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed bg-muted/20 rounded-2xl p-4 sm:p-6 border border-border/30" 
                dangerouslySetInnerHTML={{ __html: product.short_description }} 
              />
            )}

            {/* Actions (Add to Cart, etc.) */}
            <div className="pt-4">
              <ProductClient product={product} />
            </div>
            
            <div className="pt-2">
              <ReviewPopup productId={product.id} />
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Details & Reviews Grid */}
      <FadeIn delay={0.2} className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        
        {/* Full Description */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight px-2">Thông tin chi tiết</h2>
          <div className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-8 shadow-sm">
            {product.description ? (
              <div 
                className="prose prose-base dark:prose-invert max-w-none prose-img:rounded-2xl prose-img:shadow-sm" 
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            ) : (
              <p className="text-muted-foreground italic">Sản phẩm chưa có mô tả chi tiết.</p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight px-2">Đánh giá</h2>
          <div className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-8 shadow-sm">
            <ProductReviews productId={product.id} />
          </div>
        </div>

      </FadeIn>
    </div>
  );
}
