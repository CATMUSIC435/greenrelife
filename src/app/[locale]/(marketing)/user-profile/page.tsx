'use client';

import { SignInButton, useUser } from '@clerk/nextjs';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

export default function UserInfo() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <p>Đang tải...</p>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex justify-center">
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
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl px-4 py-6">
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

      <div className="max-w-sm rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur-2xl">
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
          <span className="rounded-md bg-gray-100/20 px-2 py-1 backdrop-blur-md">
            ID:
            {user.id}
          </span>
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
      </div>

      <div className="flex w-full flex-col gap-1">
        <Link href="/favorite" className="rounded-md px-2 py-4 font-bold shadow-2xl backdrop-blur-lg text-shadow-2xs">
          Quản lý sản phẩm yêu thích
        </Link>
        <Link href="/product" className="rounded-md px-2 py-4 font-bold shadow-2xl backdrop-blur-lg text-shadow-2xs">
          Quản lý sản phẩm
        </Link>
        <Link href="/order" className="rounded-md px-2 py-4 font-bold shadow-2xl backdrop-blur-lg text-shadow-2xs">
          Quản lý đơn đặt hành
        </Link>
        <Link href="/chat" className="rounded-md px-2 py-4 font-bold shadow-2xl backdrop-blur-lg text-shadow-2xs">
          Quản lý tin nhắn khách hàng
        </Link>
      </div>
    </div>
  );
};
