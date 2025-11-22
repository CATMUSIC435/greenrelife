import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type ServiceCardProps = {
  id: number;
  img: string;
  title: string;
  description: string;
  price: string;
};

export default function ServiceCard({ id, title, description, img, price }: ServiceCardProps) {
  return (
    <Card className="w-full gap-2 overflow-hidden rounded-2xl py-0 shadow-md transition-all duration-300 hover:shadow-lg md:gap-4">

      <div className="relative">
        <Image
          width={1920}
          height={1080}
          src={img}
          alt="Service"
          className="h-24 w-full object-cover"
        />
        <button type="button" className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition hover:scale-110">
          <Heart className="h-4 w-4 text-red-500" />
        </button>
        <div className="absolute bottom-1 left-1  flex w-full items-center justify-between">
          <Badge className=" bg-blue-100 text-blue-600 hover:bg-blue-100">
            Cleaning
          </Badge>
        </div>
      </div>

      <CardContent className="px-2 py-2">
        <p className="mb-1 text-xs">{price}</p>
        <Link href={`/search/${id}`}>
          <h3 className="mb-1 line-clamp-2 text-sm">
            {title}
          </h3>
        </Link>

        <p className="mb-1 line-clamp-2 font-sans text-sm text-gray-500">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="David" />
            </Avatar>
            <p className="line-clamp-2 text-xs font-medium">David Rodriguez</p>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">4.9</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
