import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-20 animate-ping rounded-full bg-primary/20" />
        <div className="absolute size-16 animate-pulse rounded-full bg-primary/30" />
        <Loader2 className="relative size-10 animate-spin text-primary" />
      </div>
      <p className="text-base font-medium text-muted-foreground animate-pulse tracking-wide">
        Đang tải trang...
      </p>
    </div>
  );
}
