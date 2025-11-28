import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const listImg = [
  'https://greenrelife.dxmd.vn/wp-content/uploads/2025/11/p-1-91072887-map-income-to-buy-a-house-every-state.jpg',
  'https://greenrelife.dxmd.vn/wp-content/uploads/2025/11/appliance-repairman-in-home-in-green-bay-3.43.04-PM.jpg',
  'https://greenrelife.dxmd.vn/wp-content/uploads/2025/11/righttorepair-2048px-iStock-1226436218-2x1-1.webp',
];

export function CarouselHeader() {
  return (
    <div className="h-40">
      <Carousel className="relative h-full w-full">
        <CarouselContent>
          {listImg.map(item => (
            <CarouselItem key={item}>
              <div className="p-0">
                <Card className="p-0">
                  <CardContent className="flex h-full items-center justify-center p-0">
                    <Image src={item} alt="" width={1920} height={1080} className="h-40 w-full object-cover" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
