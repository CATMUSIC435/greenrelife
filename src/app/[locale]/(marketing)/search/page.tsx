import FilterTabs from '@/components/organisms/filter-tabs';
import ProductList from '../_components/product-list';
import SearchHeader from '../_components/search-header';

export default async function Index() {
  return (
    <div className="w-full px-4">
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
  );
}
