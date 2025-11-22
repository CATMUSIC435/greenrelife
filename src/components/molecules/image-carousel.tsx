// components/ImageCarousel.tsx
'use client';

import Image from 'next/image';

// eslint-disable-next-line unused-imports/no-unused-vars
export default function ImageCarousel({ images = [], selectedIndex = 0, onChange = (i: number) => { } }: {
  images: any[];
  selectedIndex?: number;
  onChange?: (i: number) => void;
}) {
  if (!images || images.length === 0) {
    return (<div className="flex h-72 w-full items-center justify-center rounded-md bg-gray-100">Không có ảnh</div>);
  }

  const img = images[selectedIndex];

  return (
    <div>
      <div className="relative h-96 w-full overflow-hidden rounded-lg">
        <Image
          src={img.src}
          alt={img.alt || ''}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      {/* simple controls */}
      <div className="mt-2 flex items-center justify-between">
        <button
          onClick={() => onChange(Math.max(0, selectedIndex - 1))}
          className="rounded border px-3 py-1 disabled:opacity-50"
          disabled={selectedIndex === 0}
          type="button"
        >
          Prev
        </button>

        <div className="text-sm text-gray-500">
          {selectedIndex + 1}
          {' '}
          /
          {' '}
          {images.length}
        </div>

        <button
          onClick={() => onChange(Math.min(images.length - 1, selectedIndex + 1))}
          className="rounded border px-3 py-1 disabled:opacity-50"
          disabled={selectedIndex === images.length - 1}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
