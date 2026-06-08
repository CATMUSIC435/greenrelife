'use client';

import { createContext, use, useEffect, useState } from 'react';

type FilterState = {
  search: string;
  categories: number[];
  products: any[];
  setSearch: (v: string) => void;
  toggleCategory: (id: number) => void;
};

const FilterContext = createContext<FilterState | null>(null);

export function FilterProvider({
  children,
  initialProducts = [],
}: {
  children: React.ReactNode;
  initialProducts?: any[];
}) {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<number[]>([]);
  const [products, setProducts] = useState(initialProducts);

  // Hàm toggle category
  const toggleCategory = (id: number) => {
    setCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id],
    );
  };

  // Fetch API khi filter đổi (bỏ qua lần đầu nếu không có filter)
  useEffect(() => {
    // Nếu chưa có filter nào thì không cần fetch lại, dùng initialProducts
    if (!search && categories.length === 0) {
      setProducts(initialProducts);
      return;
    }

    const fetchProducts = async () => {
      const params = new URLSearchParams();

      if (search) {
        params.append('search', search);
      }
      if (categories.length > 0) {
        params.append('category', categories.join(','));
      }

      params.append('per_page', '100');

      const res = await fetch(
        `https://greenrelife.dxmd.vn/wp-json/wc/v3/products?${params.toString()}&stock_status=instock`,
        {
          headers: {
            Authorization:
              `Basic ${
                btoa(
                  'ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43',
                )}`,
          },
        },
      );

      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [search, categories]);

  return (
    <FilterContext
      value={{ search, categories, products, setSearch, toggleCategory }}
    >
      {children}
    </FilterContext>
  );
}

export function useFilter() {
  const ctx = use(FilterContext);
  if (!ctx) {
    throw new Error('useFilter must be used inside FilterProvider');
  }
  return ctx;
}
