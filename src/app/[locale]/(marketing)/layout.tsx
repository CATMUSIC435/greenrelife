import IconMenu from '@/components/molecules/icon-menu';
import 'mapbox-gl/dist/mapbox-gl.css';

export const metadata = {
  title: 'My Awesome Next.js App',
  description: 'This is a description of my awesome Next.js application.',
  keywords: ['nextjs', 'seo', 'web development'],
  openGraph: {
    title: 'My Awesome Next.js App',
    description: 'This is a description of my awesome Next.js application.',
    url: 'https://example.com',
    type: 'website',
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
    </div>
  );
}
