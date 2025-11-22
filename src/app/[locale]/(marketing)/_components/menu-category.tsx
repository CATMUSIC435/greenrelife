/* eslint-disable no-console */
'use client';

import { Bell, Home, Settings, ShoppingCart, Star, User } from 'lucide-react';
import { useState } from 'react';

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: number;
};

export default function MenuCategory() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const menuItems: MenuItem[] = [
    { label: 'Trang Chủ', icon: <Home size={36} className="text-white" />, action: () => console.log('Đi tới trang chủ') },
    { label: 'Người Dùng', icon: <User size={36} className="text-white" />, action: () => console.log('Mở modal user'), badge: 3 },
    { label: 'Giỏ Hàng', icon: <ShoppingCart size={36} className="text-white" />, action: () => console.log('Mở giỏ hàng') },
    { label: 'Cài Đặt', icon: <Settings size={36} className="text-white" />, action: () => console.log('Đi tới cài đặt') },
    { label: 'Thông Báo', icon: <Bell size={36} className="text-white" />, action: () => console.log('Hiển thị thông báo'), badge: 5 },
    { label: 'Yêu Thích', icon: <Star size={36} className="text-white" />, action: () => console.log('Hiển thị danh sách yêu thích') },
  ];

  return (
    <div className="w-full overflow-x-auto md:hidden">
      <ul className="grid grid-cols-3 gap-2">
        {menuItems.map((item, index) => (
          <li key={item.label} className="relative flex min-w-[60px] flex-col items-center rounded-md bg-green-300 py-4 shadow-2xs backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                setActiveIndex(index);
                item.action();
              }}
              className={`flex flex-col items-center ${activeIndex === index ? 'text-blue-500' : 'text-black'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 text-sm font-bold">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
