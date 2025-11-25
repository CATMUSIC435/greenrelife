import Link from 'next/link';
import ProductList from '../_components/product-list';

export default async function Index() {
  return (
    <div className="w-full px-4">
      <div className="py-2">
        <Link href="product/create">
          Tạo sản phẩm
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <ProductList />
      </div>
    </div>
  );
}
