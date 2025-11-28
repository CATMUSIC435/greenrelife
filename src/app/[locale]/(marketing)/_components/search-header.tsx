'use client';

import { Input } from '@/components/ui/input';
import { useFilter } from '@/contexts/filter-context';

export default function SearchHeader() {
  const { search, setSearch } = useFilter();

  return (
    <div className="flex items-center gap-4">
      <div className="flex w-full max-w-md items-center rounded-md border border-gray-300 bg-white px-2 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-5 w-5 text-gray-500"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <Input
          placeholder="Search services..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border-0 p-0 shadow-none focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
