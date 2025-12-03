import { Toaster } from 'sonner';
import IconMenu from '@/components/molecules/icon-menu';
import 'mapbox-gl/dist/mapbox-gl.css';

export const metadata = {
  title: 'GreenRelife - Trao đổi, Buôn bán & Sửa chữa đồ cũ cho sinh viên ',
  description: 'GreenRelife là nền tảng toàn diện cho trao đổi, buôn bán, sửa chữa đồ cũ cho sinh viên . Tìm kiếm, đăng tin, và kết nối với dịch vụ sửa chữa nhanh chóng.',
  keywords: [
    'GreenRelife',
  ],

  // Hình đại diện cho web
  icons: {
    icon: '/logo.png', // favicon tiêu chuẩn
    shortcut: '/logo.png', // shortcut icon
    apple: '/logo.png', // apple touch icon
  },

  openGraph: {
    title: 'GreenRelife - Trao đổi, Buôn bán & Sửa chữa đồ cũ cho sinh viên ',
    description: 'GreenRelife là nền tảng toàn diện cho trao đổi, buôn bán, sửa chữa đồ cũ cho sinh viên . Tìm kiếm, đăng tin, và kết nối với dịch vụ sửa chữa nhanh chóng.',
    url: 'https://greenrelife.io.vn',
    type: 'website',
    images: [
      {
        url: '/logo-greenrelife.png', // hình đại diện Open Graph
        width: 800,
        height: 600,
        alt: 'GreenRelife Logo',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'GreenRelife - Trao đổi, Buôn bán & Sửa chữa đồ cũ cho sinh viên ',
    description: 'GreenRelife là nền tảng toàn diện cho trao đổi, buôn bán, sửa chữa đồ cũ cho sinh viên .',
    images: ['/logo-greenrelife.png'],
  },
};

// import { getTranslations, setRequestLocale } from 'next-intl/server';
export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'RootLayout',
  // });

  return (
    <div className="bg-layer-gradient min-h-screen">
      <div className="mx-auto w-full max-w-md">
        {props.children}
      </div>
      <div className="fixed bottom-2 flex w-full justify-center">
        <IconMenu />
      </div>
      <Toaster richColors />
    </div>
  );
}
