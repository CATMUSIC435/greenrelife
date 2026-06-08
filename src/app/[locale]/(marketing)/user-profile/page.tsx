'use client';

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionTitle } from '@/components/ui/section-title';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, Package, ShoppingBag, MessageSquare, MessagesSquare, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

type MenuItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const menuList: MenuItem[] = [
  { href: '/favorite', label: 'Sản phẩm yêu thích', icon: <Heart className="size-5 text-rose-500" /> },
  { href: '/product', label: 'Quản lý sản phẩm', icon: <Package className="size-5 text-blue-500" /> },
  { href: '/order', label: 'Quản lý đơn đặt hàng', icon: <ShoppingBag className="size-5 text-emerald-500" /> },
  { href: '/chat/user', label: 'Tin nhắn của bạn', icon: <MessageSquare className="size-5 text-violet-500" /> },
  { href: '/chat', label: 'Tin nhắn khách hàng', icon: <MessagesSquare className="size-5 text-orange-500" /> },
  { href: '/contact', label: 'Đóng góp ý kiến', icon: <HelpCircle className="size-5 text-sky-500" /> },
];

export default function UserInfo() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="mx-auto flex max-w-lg flex-col gap-6 px-4 py-12">
        <div className="flex justify-center"><Skeleton className="h-8 w-48 rounded-full" /></div>
        <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm flex items-center gap-5 mt-4">
          <Skeleton className="size-20 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </div>
        </div>
        <div className="w-full rounded-2xl border border-border bg-card shadow-sm p-4 space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-5 flex-1" />
              <Skeleton className="size-5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center pt-24 px-4 text-center">
        <SectionTitle title="Hồ sơ cá nhân" />
        <p className="mt-4 text-muted-foreground mb-8">Vui lòng đăng nhập để xem thông tin cá nhân và quản lý đơn hàng của bạn.</p>
        <SignInButton mode="modal">
          <button type="button" className="w-full rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 active:scale-95">
            Đăng nhập ngay
          </button>
        </SignInButton>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  
  const formatDate = (dateStr?: string) =>
    dateStr ? dayjs(dateStr).format('DD/MM/YYYY') : 'N/A';

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 px-4 py-12">
      <FadeIn>
        <SectionTitle title="Hồ sơ cá nhân" className="text-center" />
      </FadeIn>

      <FadeIn delay={0.1} className="w-full rounded-2xl bg-card border border-border p-6 shadow-sm flex items-center gap-5 mt-4">
        {/* Avatar */}
        <div className="relative size-20 flex-shrink-0 rounded-full border-2 border-primary/20 p-1">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.username || 'Avatar'}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="size-full rounded-full bg-muted" />
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <p className="text-xl font-bold text-foreground truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {user.emailAddresses[0]?.emailAddress}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
              {(user.publicMetadata?.role as string) || 'Khách hàng'}
            </span>
            <span className="text-muted-foreground">
              Tham gia: {formatDate(`${user.createdAt}`)}
            </span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="w-full overflow-hidden rounded-2xl bg-card border border-border shadow-sm">
        <div className="flex flex-col">
          {menuList.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/50 active:bg-muted ${
                index !== menuList.length - 1 ? 'border-b border-border/50' : ''
              }`}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background border border-border shadow-sm">
                {item.icon}
              </div>
              <span className="flex-1 font-medium text-foreground">{item.label}</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <SignOutButton redirectUrl="/">
          <button type="button" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive/10 px-4 py-4 font-medium text-destructive transition-colors hover:bg-destructive/20 active:scale-95">
            <LogOut className="size-5" />
            Đăng xuất
          </button>
        </SignOutButton>
      </FadeIn>
    </div>
  );
}
