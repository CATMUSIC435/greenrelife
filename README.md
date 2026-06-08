# GreenReLife 🌿

**GreenReLife** là nền tảng thương mại điện tử và dịch vụ sửa chữa/mua bán đồ cũ/tái chế, được xây dựng theo phong cách thiết kế hiện đại (Apple-like UI & Glassmorphism) tập trung tối đa vào trải nghiệm người dùng (UX/UI).

Dự án sử dụng kiến trúc **Headless E-commerce**, kết hợp sức mạnh của **Next.js** ở phía Frontend và **WordPress/WooCommerce** ở phía Backend.

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Ngôn ngữ**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/) (Tùy chỉnh giao diện kính mờ Glassmorphism)
- **Authentication**: [Clerk](https://clerk.com/) (Đăng nhập, quản lý người dùng bảo mật cao)
- **Headless CMS & E-commerce**: WordPress + WooCommerce REST API (`greenrelife.dxmd.vn`)
- **Database (Tính năng phụ)**: [Supabase](https://supabase.com/) (Dùng cho Chat realtime, Sản phẩm yêu thích)
- **Bản đồ**: Mapbox (Định vị sản phẩm/dịch vụ)
- **Icons**: Lucide React

## 💎 Tính Năng Chính (Key Features)

- **Marketplace Đa Năng**: Hỗ trợ đăng bán sản phẩm vật lý hoặc cung cấp dịch vụ sửa chữa với vị trí địa lý chính xác qua bản đồ.
- **Giao Diện Hiện Đại (Premium UI)**: Các hiệu ứng kính mờ (backdrop-blur), bo góc mềm mại, Skeleton Loading, đổ bóng tinh tế theo phong cách thiết kế của Apple.
- **Tìm Kiếm & Lọc (Search & Filter)**: Khám phá sản phẩm, dịch vụ mượt mà.
- **Giỏ Hàng & Thanh Toán (Checkout)**: Tích hợp quy trình mua hàng, đặt lịch sửa chữa nhanh chóng.
- **Quản lý Đơn Hàng**: Theo dõi trạng thái, hủy đơn, xem lịch sử ngay trên web.
- **Nhắn Tin Trực Tiếp (Real-time Chat)**: Giao tiếp giữa người mua và người bán theo thời gian thực (Supabase).
- **Yêu Thích (Favorites)**: Lưu trữ các sản phẩm quan tâm.
- **Blog & Kiến Thức**: Cập nhật tin tức, mẹo vặt bảo vệ môi trường, sửa chữa đồ đạc (Dữ liệu từ WordPress Posts).

## 🛠 Hướng Dẫn Cài Đặt (Getting Started)

### 1. Yêu cầu hệ thống (Prerequisites)
- Node.js 20.x trở lên
- npm, yarn hoặc pnpm

### 2. Cài đặt biến môi trường (Environment Variables)
Tạo file `.env.local` ở thư mục gốc và cung cấp các khóa API cần thiết:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase (Chat & Favorites)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your_supabase_anon_key

# Headless WordPress & WooCommerce
NEXT_PUBLIC_WORDPRESS_API=https://greenrelife.dxmd.vn/wp-json/wp/v2
NEXT_PUBLIC_COCART_BASE_URL=https://greenrelife.dxmd.vn/wp-json/cocart
NEXT_PUBLIC_WC_CONSUMER_KEY=your_wc_key
NEXT_PUBLIC_WC_CONSUMER_SECRET=your_wc_secret

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### 3. Cài đặt dependencies và Chạy dự án
```bash
# Cài đặt gói thư viện
npm install

# Khởi chạy môi trường phát triển
npm run dev
```

Mở trình duyệt và truy cập `http://localhost:3000` để trải nghiệm ứng dụng.

## 🤝 Đóng Góp (Contributing)
1. Fork dự án
2. Tạo nhánh tính năng (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng AmazingFeature'`)
4. Push lên nhánh (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License
Được phát triển riêng cho nền tảng GreenReLife. All rights reserved.
