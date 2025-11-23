import { CarouselHeader } from './_components/carousel-header';
import MenuCategory from './_components/menu-category';
import NewsCarousel from './_components/news-carousel';
import ProductCarousel from './_components/product-carousel';

import UserInfo from './_components/user-info';

export default async function Index() {
  return (
    <div className="w-full pb-20">
      <div>
        <UserInfo />
      </div>
      <div className="px-4">
        <div className="py-2">
          <CarouselHeader />
        </div>
        <div className="py-2">
          <MenuCategory />
        </div>
        <div className="py-2">
          <h2 className="pb-1 text-lg font-bold">Sửa chữa</h2>
          <div className="h-px w-1/2 bg-gray-400"></div>
          <div className="pt-2">
            <ProductCarousel />
          </div>
        </div>

        <div className="py-2">
          <h2 className="pb-1 text-lg font-bold">Bán hàng</h2>
          <div className="h-[1px] w-1/2 bg-gray-400"></div>
          <div className="pt-2">
            <ProductCarousel id={32} />
          </div>
        </div>

        <div className="py-2">
          <h2 className="pb-1 text-lg font-bold">Tin tức</h2>
          <div className="h-px w-1/2 bg-gray-400"></div>
          <div className="pt-2">
            <NewsCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
