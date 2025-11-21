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
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {products?.map(product => (
        <a
          key={product.id}
          href={product.permalink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="overflow-hidden rounded-lg border transition-shadow hover:shadow-md"
        >
          <img
            src={product.images?.[0]?.src || '/placeholder.png'}
            alt={product.name}
            className="h-40 w-full object-cover"
          />
          <div className="p-2">
            <h3 className="text-sm font-semibold">{product.name}</h3>
            <p className="mt-1 font-bold text-red-500">{product.price ? `${product.price} đ` : 'Liên hệ'}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
