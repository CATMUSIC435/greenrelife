'use client';

import { useFilter } from '@/contexts/filter-context';
import ProductCategories from '../_components/product-categories';
import ProductList from '../_components/product-list';
import SearchHeader from '../_components/search-header';

export default function PageContent() {
  const { products } = useFilter();

  return (
    <div className="w-full px-4">
      <div className="py-2">
        <SearchHeader />
      </div>

      <div className="pb-4">
        <ProductCategories />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <ProductList products={products} />
      </div>
    </div>
  );
}
