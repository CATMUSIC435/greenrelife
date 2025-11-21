import FilterTabs from '@/components/organisms/filter-tabs';
import ServiceCard from '@/components/organisms/service-card';
import MenuCategory from './_components/menu-category';
import SearchHeader from './_components/search-header';

export default async function Index() {
  const res = await fetch('https://greenrelife.dxmd.vn/wp-json/wc/v3/products', {
    headers: {
      Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
    },
  });
  const products = await res.json();
  console.log(products);
  return (
    <div className="w-full">
      <div className="px-4">
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
          <ServiceCard />
        </div>
      </div>
    </div>
  );
}
