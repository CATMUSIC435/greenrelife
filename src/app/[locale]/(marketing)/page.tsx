import { CarouselHeader } from './_components/carousel-header';
import MenuCategory from './_components/menu-category';
import ProductList from './_components/product-list';
import UserInfo from './_components/user-info';

export default async function Index() {
  return (
    <div className="w-full">
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
        <div className="py-4">
          <div className="grid grid-cols-1 gap-4">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}
