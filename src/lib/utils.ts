import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseLatLng(str: string) {
  const [lat, lng] = str.split(',').map(Number);
  return { lat: lat || 10.8000, lng: lng || 106.6667 };
}
