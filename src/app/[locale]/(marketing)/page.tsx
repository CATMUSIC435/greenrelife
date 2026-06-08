import Image from 'next/image';
import { SectionTitle } from '@/components/ui/section-title';
import { FadeIn } from '@/components/ui/fade-in';
import { CardHeader } from './_components/card-header';
import { CarouselHeader } from './_components/carousel-header';
import MenuCategory from './_components/menu-category';
import NewsCarousel from './_components/news-carousel';
import ProductCarousel from './_components/product-carousel';
import UserInfo from './_components/user-info';

export default async function Index() {
  return (
    <div className="w-full pb-12">
      <UserInfo />
      
      <FadeIn delay={0.1}>
        <div className="mx-auto mt-6 h-auto w-2/3 md:w-1/2">
          <Image src="/logo.png" height={400} width={480} alt="GreenRelife Logo" className="h-auto w-full object-cover drop-shadow-sm" />
        </div>
      </FadeIn>

      <div className="px-4 py-4 md:px-8">
        <FadeIn delay={0.2}>
          <div className="pb-4">
            <CardHeader />
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="py-4">
            <MenuCategory />
          </div>
        </FadeIn>

        <FadeIn delay={0.4} className="py-6">
          <SectionTitle title="Sửa chữa" subtitle="Dịch vụ sửa chữa uy tín và nhanh chóng" />
          <div className="pt-4">
            <ProductCarousel id={20} />
          </div>
        </FadeIn>

        <FadeIn delay={0.5} className="py-4">
          <CarouselHeader />
        </FadeIn>

        <FadeIn delay={0.6} className="py-6">
          <SectionTitle title="Bán hàng" subtitle="Trao đổi đồ cũ chất lượng cho sinh viên" />
          <div className="pt-4">
            <ProductCarousel id={32} />
          </div>
        </FadeIn>

        <FadeIn delay={0.7} className="py-6">
          <SectionTitle title="Tin tức" subtitle="Cập nhật những thông tin mới nhất từ GreenRelife" />
          <div className="pt-4">
            <NewsCarousel />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
