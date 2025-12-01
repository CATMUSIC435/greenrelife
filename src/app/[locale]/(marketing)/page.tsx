import { CardHeader } from './_components/card-header';
import { CarouselHeader } from './_components/carousel-header';
import MenuCategory from './_components/menu-category';
import NewsCarousel from './_components/news-carousel';
import ProductCarousel from './_components/product-carousel';

import UserInfo from './_components/user-info';

export default async function Index() {
  return (
    <div className="w-full pb-20">
      <UserInfo />
      <div className="px-4 py-4">
        <CardHeader />
        <div className="py-4">
          <MenuCategory />
        </div>
        <div className="py-2">
          <h2 className="mb-2 pb-1 text-center text-2xl font-bold text-white shadow-2xl">Sửa chữa</h2>
          <div className="pt-2">
            <ProductCarousel id={20} />
          </div>
        </div>

        <div className="py-2">
          <CarouselHeader />
        </div>
        <div className="py-2">
          <h2 className="mb-2 pb-1 text-center text-2xl font-bold text-white shadow-2xl">Bán hàng</h2>
          <div className="pt-2">
            <ProductCarousel id={32} />
          </div>
        </div>

        <div className="py-2">
          <h2 className="mb-2 pb-1 text-center text-2xl font-bold text-white shadow-2xl">Tin tức</h2>
          <div className="pt-2">
            <NewsCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
