'use client';

import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useFilter } from '@/contexts/filter-context';
import { cn } from '@/lib/utils';

export default function ProductCategories({ initialCategories = [] }: { initialCategories?: any[] }) {
  const { categories, toggleCategory } = useFilter();

  if (!initialCategories || initialCategories.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex items-center gap-3 px-1">
          {initialCategories.map(cat => {
            const isActive = categories.includes(cat.id);
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 transition-all duration-300 ease-in-out active:scale-95 shadow-sm',
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-background hover:bg-muted/50 hover:border-gray-300'
                )}
              >
                {/* Ảnh thumbnail siêu nhỏ */}
                {cat.image?.src && (
                  <div className="relative size-6 shrink-0 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src={cat.image.src}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  </div>
                )}
                <span className="font-medium text-sm">{cat.name}</span>
                <span className={cn(
                  "ml-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                  isActive ? "bg-white/20 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                )}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
