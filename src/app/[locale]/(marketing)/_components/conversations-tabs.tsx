'use client';
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function ConversationsTabs() {
  const [value, setValue] = React.useState('all');

  return (
    <div className="flex w-full items-center justify-between py-2">
      <h2 className="text-xl font-semibold">Conversations</h2>

      <ToggleGroup
        type="single"
        value={value}
        onValueChange={v => v && setValue(v)}
        className="flex h-9 items-center gap-1 rounded-full border px-1"
      >
        <ToggleGroupItem
          value="all"
          className="rounded-full px-4 data-[state=on]:bg-muted"
        >
          All
        </ToggleGroupItem>
        <ToggleGroupItem
          value="favorites"
          className="rounded-full px-4 data-[state=on]:bg-muted"
        >
          <div className="flex items-center gap-1">
            <span>❤</span>
            <span>Favorites</span>
          </div>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
