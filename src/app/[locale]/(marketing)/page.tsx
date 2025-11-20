'use client';
import { useState } from 'react';

import ToggleSwitch from '@/components/molecules/toggle-switch';
import FilterTabs from '@/components/organisms/filter-tabs';
import ServiceCard from '@/components/organisms/service-card';
import SearchHeader from './_components/search-header';

export default function Index() {
  const [compact, setCompact] = useState(false);
  return (

    <div className="max-w-8xl">
      <div className="px-4">
        <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:gap-4">
          <div>
            <h1 className="font-môn text-xl font-bold md:text-2xl">ServiceSwap</h1>
          </div>
          <SearchHeader />
        </div>
        <div className="grid grid-cols-1 gap-2 py-1 md:grid-cols-2 md:gap-4">
          <div className="flex items-center justify-between">
            <div>

            </div>
            <ToggleSwitch
              label="Compact"
              checked={compact}
              onChange={setCompact}
            />
          </div>
          <div className="py-1">
            <FilterTabs />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </div>
    </div>
  );
}
