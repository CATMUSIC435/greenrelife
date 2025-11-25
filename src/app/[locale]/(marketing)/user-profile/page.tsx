'use client';

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
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
          <button type="button" className="rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600">
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
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl bg-white p-6 shadow-lg">
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

      {/* Info */}
      <div className="flex-1">
        <p className="text-xl font-semibold text-gray-800">
          {user.firstName}
          {' '}
          {user.lastName}
          {' '}
          {user.username ? `(${user.username})` : ''}
        </p>
        <p className="text-sm text-gray-500">{user.emailAddresses[0]?.emailAddress}</p>
        <p className="text-sm text-gray-500">
          User ID:
          {user.id}
        </p>
        <p className="text-sm text-gray-500">
          Role:
          {' '}
          {(user.publicMetadata?.role as string) || 'User'}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Created:
          {' '}
          {formatDate(`${user.createdAt}`)}
        </p>
        <div className="mt-3 flex gap-2">
          <SignOutButton>
            <button type="button" className="rounded bg-red-500 px-4 py-1 text-white transition hover:bg-red-600">
              Đăng xuất
            </button>
          </SignOutButton>
        </div>
      </div>

      <div className="flex flex-col">
        <Link href="/favorite" className="bg-gray-100/20 px-2 py-2 backdrop-blur-md">
          Quản lý sản phẩm yêu thích
        </Link>
        <Link href="/product" className="bg-gray-100/20 px-2 py-2 backdrop-blur-md">
          Quản lý sản phẩm
        </Link>
        <Link href="/order" className="bg-gray-100/20 px-2 py-2 backdrop-blur-md">
          Quản lý đơn đặt hành
        </Link>

      </div>
    </div>
  );
};
