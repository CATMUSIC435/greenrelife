import type { ProductCategory } from '@/types/product-category';

export const hasCategory = (categories: Array<ProductCategory> = [], categoryId: number): boolean => {
  return categories?.some(c => c.id === categoryId) ?? false;
};
