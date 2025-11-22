import ServiceCard from '@/components/organisms/service-card';

export type Product = {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: { src: string }[];
  permalink?: string;
};

export default async function ProductList() {
  const res = await fetch('https://greenrelife.dxmd.vn/wp-json/wc/v3/products', {
    headers: {
      Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
    },
  });
  const products: Array<Product> = await res.json();

  return (
    <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
      {products?.map((product, index) => (
        <ServiceCard key={index} id={product.id} title={product.name} img={product.images?.[0]?.src || '/placeholder.png'} description="" price={product.price ? `${product.price} đ` : 'Liên hệ'} />
      ))}
    </div>
  );
}
