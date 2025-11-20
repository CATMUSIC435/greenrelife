'use client';
import { Bell, HelpCircle, Home, Settings, Shield } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

const items = [
  { id: 'home', icon: Home, link: '/' },
  { id: 'bell', icon: Bell, link: '/chat' },
  { id: 'settings', icon: Settings, link: '/' },
  { id: 'help', icon: HelpCircle, link: '/' },
  { id: 'shield', icon: Shield, link: '/' },
];

export default function IconMenu() {
  const [active, setActive] = React.useState('home');

  return (
    <div className="flex w-max items-center gap-3 rounded-full border bg-white/40 px-2 shadow-sm backdrop-blur-md">
      {items.map(({ id, icon: Icon, link }) => (
        <button
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
