import { FilterProvider } from '@/contexts/filter-context';
import PageContent from '../_components/page-content';

export default async function Index() {
  return (
    <FilterProvider>
      <PageContent />
    </FilterProvider>
  );
}
