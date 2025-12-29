'use client';

import { Bell, Home, Settings, ShoppingCart, Star, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  badge?: number;
  link: string;
};

export default function MenuCategory() {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { label: 'Trang Chủ', icon: <Home size={30} className="text-white" />, link: '/' },
    { label: 'Người Dùng', icon: <User size={30} className="text-white" />, link: '/user-profile' },
    { label: 'Sản phẩm', icon: <ShoppingCart size={30} className="text-white" />, link: '/product' },
    { label: 'Cài Đặt', icon: <Settings size={30} className="text-white" />, link: '/favorite' },
    { label: 'Thông Báo', icon: <Bell size={30} className="text-white" />, link: '/chat' },
    { label: 'Yêu Thích', icon: <Star size={30} className="text-white" />, link: '/favorite' },
  ];

  return (
    <div className="w-full overflow-x-auto md:hidden">
      <ul className="grid grid-cols-3 gap-4 py-2">
        {menuItems.map(item => (
          <li key={item.label} className="relative flex min-w-[60px] flex-col items-center rounded-md py-4 shadow-md  backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                router.push(`${item.link}`);
              }}
              className="flex flex-col items-center text-white"
            >
              <div className="relative">
                {item.icon}
              </div>
              <span className="mt-1 text-xs">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
