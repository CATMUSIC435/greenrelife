import IconMenu from '@/components/molecules/icon-menu';

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
    <>
      {props.children}
      <div className="fixed bottom-2 flex w-full justify-center">
        <IconMenu />
      </div>
    </>
  );
}
