import type { Product } from '../_components/product-list';
import Link from 'next/link';
import ProductListUser from '../_components/product-list-user';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionTitle } from '@/components/ui/section-title';
import { Plus } from 'lucide-react';

export default async function Index() {
  const res = await fetch('https://greenrelife.dxmd.vn/wp-json/wc/v3/products', {
    headers: {
      Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
    },
    cache: 'no-store',
    next: { revalidate: 0 },
  });
  
  const products: Array<Product> = await res.json();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <FadeIn className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SectionTitle title="Quản lý sản phẩm" className="!mb-0" alignment="left" />
        <Link 
          href="/product/create" 
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95 shrink-0"
        >
          <Plus className="size-4" />
          Tạo sản phẩm
        </Link>
      </FadeIn>

      <FadeIn delay={0.2} className="grid grid-cols-1 gap-4">
        <ProductListUser products={products} />
      </FadeIn>
    </div>
  );
}
