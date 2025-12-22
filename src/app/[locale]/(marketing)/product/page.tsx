import type { Product } from '../_components/product-list';
import Link from 'next/link';
import ProductListUser from '../_components/product-list-user';

export default async function Index() {
  const res = await fetch('https://greenrelife.dxmd.vn/wp-json/wc/v3/products', {
    headers: {
      Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
        },
        cache: "no-store",
  next: { revalidate: 0 },
  });
  const products: Array<Product> = await res.json();
  return (
    <div className="w-full px-4">
      <div className="py-2">
        <Link href="product/create" className="mb-4 block w-full rounded-md bg-blue-600 px-2 py-2 text-center text-2xl font-bold text-white shadow-2xl text-shadow-2xs ">
          Tạo sản phẩm
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <ProductListUser products={products} />
      </div>
    </div>
  );
}
