'use client';

import { Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const categories: string[] = [
  'All',
  'Cleaning',
  'Cooking',
  'Education',
  'Fitness',
  'Gardening',
  'Home Repair',
  'Tech',
];

export default function FilterTabs(): JSX.Element {
  const [active, setActive] = useState<string>('All');

  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-center gap-2">
          {categories.map((cat, index) => (
            <Button
              key={cat}
              variant="ghost"
              onClick={() => setActive(cat)}
              className={
                `flex items-center gap-2 rounded-full px-4 py-2 transition-all`
                + ` ${active === cat
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              {index === 0 && <Filter size={18} />}
              {cat}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
