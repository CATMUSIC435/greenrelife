import { FilterProvider } from '@/contexts/filter-context';
import PageContent from '../_components/page-content';

async function fetchCategories() {
  const res = await fetch('https://greenrelife.dxmd.vn/wp-json/wc/v3/products/categories', {
    headers: {
      Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

async function fetchDefaultProducts() {
  const res = await fetch('https://greenrelife.dxmd.vn/wp-json/wc/v3/products?per_page=100&stock_status=instock', {
    headers: {
      Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Index() {
  const [categoriesData, defaultProducts] = await Promise.all([
    fetchCategories(),
    fetchDefaultProducts(),
  ]);

  return (
    <FilterProvider initialProducts={defaultProducts}>
      <PageContent initialCategories={categoriesData} />
    </FilterProvider>
  );
}
