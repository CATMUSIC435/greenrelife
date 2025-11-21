import FilterTabs from '@/components/organisms/filter-tabs';
import { CarouselHeader } from './_components/carousel-header';
import MenuCategory from './_components/menu-category';
import ProductList from './_components/product-list';
import SearchHeader from './_components/search-header';

export default async function Index() {
  return (
    <div className="w-full">
      <div className="px-4">
        <div className="py-2">
          <CarouselHeader />
        </div>
        <div className="py-2">
          <MenuCategory />
        </div>
        <div className="py-2">
          <SearchHeader />
        </div>
        <div className="pt-2 pb-4">
          <FilterTabs />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
