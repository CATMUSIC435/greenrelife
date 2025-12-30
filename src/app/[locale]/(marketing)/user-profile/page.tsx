'use client';

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  href: string;
  label: string;
}

const menuList: MenuItem[] = [
  { href: "/favorite", label: "Quản lý sản phẩm yêu thích" },
  { href: "/product", label: "Quản lý sản phẩm" },
  { href: "/order", label: "Quản lý đơn đặt hàng" },
  { href: "/chat/user", label: "Quản lý tin nhắn của bạn" },
  { href: "/chat", label: "Quản lý tin nhắn khách hàng" },
  { href: "/contact", label: "Đóng góp ý kiến" },
];

export default function UserInfo() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <p>Đang tải...</p>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <SignInButton mode="modal">
          <button type="button" className="w-full rounded bg-blue-500 px-6 py-2 text-white shadow-2xl transition hover:bg-blue-600">
            Đăng nhập
          </button>
        </SignInButton>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  const formatDate = (dateStr?: string) =>
    dateStr ? dayjs(dateStr).format('DD/MM/YYYY HH:mm') : 'N/A';

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl px-4 pt-4 pb-20">
      {/* Avatar */}
      {user.imageUrl && (
        <div className="relative h-24 w-24 flex-shrink-0">
          <Image
            src={user.imageUrl}
            alt={user.username || 'Avatar'}
            fill
            className="rounded-full object-cover"
          />
        </div>
      )}

      <div className="w-full max-w-sm rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-2xl">
        {/* Name + Username */}
        <p className="text-lg font-bold text-gray-900">
          {user.firstName}
          {' '}
          {user.lastName}
          {' '}
          {user.username && (
            <span className="font-medium text-indigo-500">
              (
              {user.username}
              )
            </span>
          )}
        </p>

        {/* Email */}
        <p className="mt-1 truncate text-sm">{user.emailAddresses[0]?.emailAddress}</p>

        {/* ID and Role */}
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <span className="rounded-md bg-indigo-100/20 px-2 py-1 text-indigo-800">
            Role:
            {' '}
            {(user.publicMetadata?.role as string) || 'User'}
          </span>
        </div>

        {/* Created Date */}
        <p className="mt-2 text-xs">
          Created:
          {' '}
          {formatDate(`${user.createdAt}`)}
        </p>

        <SignOutButton redirectUrl="/">
          <button type="button" className="mt-2 w-full rounded-md bg-red-500 px-6 py-2 text-white shadow-2xl transition hover:bg-red-600">
            Đăng xuất
          </button>
        </SignOutButton>
      </div>

      <div className="flex w-full flex-col gap-1">
     {menuList.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-2 py-4 font-bold shadow-2xl
                     text-indigo-900 backdrop-blur-lg text-shadow-2xs"
        >
          {item.label}
        </Link>
      ))}
      </div>
      <div className="mt-4 w-full">
        <div className="mx-auto h-auto w-2/3">
          <Image src="/logo.png" height={400} width={480} alt="" className="h-auto w-full object-cover" />
        </div>
      </div>
    </div>
  );
};
