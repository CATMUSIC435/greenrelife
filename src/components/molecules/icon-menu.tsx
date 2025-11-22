'use client';
import { Home, Map, Newspaper, Search, Settings } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

const items = [
  { id: 'home', icon: Home, link: '/' },
  { id: 'bell', icon: Search, link: '/search' },
  { id: 'map', icon: Map, link: '/map' },
  { id: 'post', icon: Newspaper, link: '/blog' },
  { id: 'shield', icon: Settings, link: '/user-profile' },
];

export default function IconMenu() {
  const [active, setActive] = React.useState('home');

  return (
    <div className="flex w-max items-center gap-3 rounded-full border bg-white/40 px-2 shadow-sm backdrop-blur-md">
      {items.map(({ id, icon: Icon, link }) => (
        <button
          type="button"
          key={id}
          onClick={() => {
            setActive(id);
            redirect(link);
          }}
          className={cn(
            'p-3 rounded-full transition-all flex items-center justify-center',
            active === id
              ? 'bg-muted/20 backdrop-blur-md shadow-sm'
              : 'hover:bg-muted/60',
          )}
        >
          <Icon
            size={22}
            className={cn(
              'transition-all',
              active === id ? 'text-black' : 'text-muted-foreground',
            )}
          />
        </button>
      ))}
    </div>
  );
}
