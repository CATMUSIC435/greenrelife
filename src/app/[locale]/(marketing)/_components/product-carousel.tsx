'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import ServiceCard from '@/components/organisms/service-card';

type Product = {
  id: number;
  name: string;
  images: { src: string }[];
  price: string;
};

type ProductCarouselProps = {
  id?: number;
};

export default function ProductCarousel({ id = 4 }: ProductCarouselProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [emblaRef] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `https://greenrelife.dxmd.vn/wp-json/wc/v3/products?category=20&per_page=${id}`,
        {
          headers: {
            Authorization:
              `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
          },
          cache: 'no-store',
        },
      );

      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="shrink-0 basis-1/2 px-3"
          >
            <ServiceCard key={index} id={product.id} title={product.name} img={product.images?.[0]?.src || '/placeholder.png'} description="" price={product.price ? `${product.price} đ` : 'Liên hệ'} />
          </div>
        ))}
      </div>
    </div>
  );
}
