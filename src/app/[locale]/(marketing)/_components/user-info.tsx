'use client';

import { SignInButton, useUser } from '@clerk/nextjs';
import { Bell } from 'lucide-react';
import Image from 'next/image';

const UserInfo = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex w-full justify-between rounded px-4 py-1">
        <p className="text-xs">Đang tải...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex w-full justify-between rounded px-4 py-1">
        <div className="h-8 w-8 rounded-full bg-white/80">
        </div>
        <SignInButton>
          <button type="button" className="rounded bg-blue-400 px-2 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-500">
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
    <div className="flex w-full justify-between rounded rounded-b-md px-4 py-1 shadow backdrop-blur-md">
      <div className="flex items-center gap-2">
        {user.imageUrl && (
          <Image
            src={user.imageUrl}
            alt={user.username ?? ''}
            height={100}
            width={100}
            className="mt-2 h-8 w-8 rounded-full"
          />
        )}
        <p className="text-xs font-medium text-white">
          Xin chào,
          {user.firstName || user.username}
          !
        </p>
      </div>
      <button type="button">
        <Bell size={20} color="#fff" className="font-bold" />
      </button>
    </div>
  );
};

export default UserInfo;
