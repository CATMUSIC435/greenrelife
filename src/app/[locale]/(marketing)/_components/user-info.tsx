'use client';

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';

const UserInfo = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <p>Đang tải...</p>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex w-full justify-between rounded p-4">
        <div className="h-10 w-10 rounded-full bg-gray-400">
        </div>
        <SignInButton>
          <button type="button" className="mt-2 rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-500">
            Đăng nhập
          </button>
        </SignInButton>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full justify-between rounded p-4">
      <div className="flex items-center gap-2">
        {user.imageUrl && (
          <Image
            src={user.imageUrl}
            alt={user.username ?? ''}
            height={100}
            width={100}
            className="mt-2 h-10 w-10 rounded-full"
          />
        )}
        <p className="font-bold">
          Xin chào,
          {user.firstName || user.username}
          !
        </p>
      </div>
      <SignOutButton>
        <button type="button" className="mt-2 rounded bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-red-400">
          Đăng xuất
        </button>
      </SignOutButton>
    </div>
  );
};

export default UserInfo;
