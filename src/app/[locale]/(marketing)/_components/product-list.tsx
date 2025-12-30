import type { ProductCategory } from '@/types/product-category';
import ServiceCard from '@/components/organisms/service-card';

export type Product = {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: { src: string }[];
  permalink?: string;
  creator: string;
  categories: ProductCategory[];
  average_rating: string;
  stock_quantity: number;
};

type ProductListProps = {
  products: Array<Product>;
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="mb-20 grid grid-cols-2 gap-4">
      {products?.map(product => (
        <ServiceCard quantity={product.stock_quantity} rating={product.average_rating} categories={product.categories} key={product.id} id={product.id} title={product.name} img={product.images?.[0]?.src || '/placeholder.png'} description="" price={product.price} />
      ))}
    </div>
  );
}
