import Image from 'next/image';

export function CardHeader() {
  return (
    <div className="h-56 w-full">
      <div className="relative h-full w-full rounded-md px-2 shadow-2xl backdrop-blur-sm">
        <div className="h-full w-full">
          <Image src="/assets/images/people-banner.png" height={400} width={480} alt="" className="h-auto w-full object-cover" />
        </div>
        <div className="absolute top-8 left-16">
          <div className="flex h-full flex-col justify-center font-sans text-lg font-bold text-white text-shadow-2xs text-shadow-amber-50">
            <p>Trao đổi sửa chữa</p>
            <p>Mua bán</p>
          </div>
        </div>
        <div className="absolute bottom-8 left-[40%]">
          <p className="text-2xl font-bold text-white">Có đây !</p>
        </div>
      </div>
    </div>
  );
}
