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
};

type ProductListProps = {
  products: Array<Product>;
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
      {products?.map((product, index) => (
        <ServiceCard key={index} id={product.id} title={product.name} img={product.images?.[0]?.src || '/placeholder.png'} description="" price={product.price ? `${product.price} đ` : 'Liên hệ'} />
      ))}
    </div>
  );
}
