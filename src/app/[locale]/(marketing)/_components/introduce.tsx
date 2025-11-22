'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import InfoBadge from '@/components/molecules/info-badge';
import { cn } from '@/lib/utils';

export function Introduce() {
  const [isShow, setIsShow] = useState(true);
  return (
    <div className={cn('fixed h-screen w-screen bg-white z-10', isShow ? '' : 'hidden')}>
      <div className="relative h-full w-full px-2 py-8 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">
            DISCOVER NOW
          </h2>
          <p className="text-4xl font-medium">Find Your On-Demand Service Worker</p>
          <p className="text-lg">We provid better service for you with our On-demand service app</p>
        </div>
        <div className="flex flex-col gap-8 pt-18">
          <div className="relative left-20 w-1/3">
            <InfoBadge
              text="1,500+"
              subtext="expert worker"
            />
          </div>
          <div className="relative left-56 w-1/3 ">
            <InfoBadge
              text="9,000+"
              subtext="user review"
            />
          </div>
          <div className="relative left-32 w-1/3 ">
            <InfoBadge
              text="2,000+"
              subtext="jobs"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <div className="relative">
            <div className="absolute bottom-0 left-0 flex w-full justify-center">
              <button type="button" className="rounded-full bg-white p-4 shadow-2xl" onClick={() => setIsShow(false)}>
                <ArrowUpRight size={32} className="text-gray-600" />
              </button>
            </div>
            <Image src="/architect-worker.png" alt="" width={1080} height={1920} className="w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
