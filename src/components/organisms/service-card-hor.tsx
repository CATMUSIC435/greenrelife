import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

type ServiceCardHorProps = {
  id: number;
  img: string;
  title: string;
  description: string;
};

export default function ServiceCardHor({ id, title, description, img }: ServiceCardHorProps) {
  return (
    <Card className="w-full gap-2 overflow-hidden rounded-2xl bg-transparent py-0 shadow-2xl  transition-all duration-300 hover:shadow-lg md:gap-4">

      <CardContent className="px-2 py-1">
        <div className="grid grid-cols-4">
          <Image
            width={1920}
            height={1080}
            src={img}
            alt="Service"
            className="h-24 w-full object-cover"
          />
          <div className="col-span-3">
            <Link href={`/search/${id}`}>
              <h3 className="mb-1 line-clamp-2 font-sans text-sm">
                {title}
              </h3>
            </Link>

            <p className="line-clamp-2 hidden font-mono text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
