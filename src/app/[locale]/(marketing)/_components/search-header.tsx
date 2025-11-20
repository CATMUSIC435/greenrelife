import { LogOut, Moon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchHeader() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex items-center gap-4">
      <div className="flex w-full max-w-md items-center rounded-full border border-gray-300 bg-white shadow-sm">
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
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border-0 p-0 shadow-none focus-visible:ring-0"
        />
      </div>

      <Button variant="ghost" size="icon" className="rounded-full bg-blue-50">
        <Moon className="h-5 w-5 text-blue-600" />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-full">
        <LogOut className="h-5 w-5" />
      </Button>

      <img
        src="https://i.pravatar.cc/40"
        alt="avatar"
        className="h-10 w-10 rounded-full border"
      />
    </div>
  );
}
