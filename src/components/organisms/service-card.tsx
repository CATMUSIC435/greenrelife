import type { ProductCategory } from '@/types/product-category';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FavoriteButton } from '@/app/[locale]/(marketing)/_components/favorite-button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { hasCategory } from '@/utils/has-category';
import { Badge } from '../ui/badge';

type ServiceCardProps = {
  id: number;
  img: string;
  title: string;
  description: string;
  price: string;
  categories: ProductCategory[];
  rating: string;
  quantity: number;
};

export default function ServiceCard({ id, title, description, img, price, categories, rating, quantity }: ServiceCardProps) {
  const hasCat = hasCategory(categories, 20);
  return (
    <Card className="w-full gap-2 overflow-hidden rounded-2xl bg-transparent py-0 transition-all duration-300 hover:shadow-lg md:gap-4 h-full">

      <div className="relative">
        <Image
          width={1920}
          height={1080}
          src={img}
          alt="Service"
          className="h-24 w-full object-cover"
        />
        <div className="absolute top-3 right-3 rounded-full bg-white/80 p-1 shadow transition hover:scale-110">
          <FavoriteButton productId={id} />
        </div>
        <div className="absolute bottom-1 left-1  flex w-full items-center justify-between">
          <Badge className={cn(hasCat ? 'bg-blue-100 text-blue-600 hover:bg-blue-100' : 'bg-lime-100 text-lime-600 hover:bg-lime-100')}>
            {hasCat ? 'Dịch vụ' : 'Sản phẩm'}
          </Badge>
        </div>
      </div>

      <CardContent className="px-2 py-1">
        <p className="text-sm font-bold pb-1 text-orange-600">
          {price ? `${Number(price).toLocaleString()} đ` : 'Liên hệ'}
        </p>
        <div className='flex justify-between'>
          <p className="text-xs font-medium">
            Số lượng :
          </p>
          <p className="text-xs font-bold">
            {`${quantity ?? 0}`}
          </p>
        </div>
        <Link href={`/search/${id}`}>
          <h3 className="mb-1 line-clamp-2 font-sans text-sm">
            {title}
          </h3>
        </Link>

        <p className="line-clamp-2 hidden font-mono text-sm text-gray-500">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
