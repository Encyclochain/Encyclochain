import prisma from '@/lib/db';

import { CarouselSize } from '../../components/Carousel/CarouselBooks';
import { CarouselMedia } from '../../components/Carousel/CarouselMedia';
import { CarouselCategoryX } from '../../components/Carousel/CarouselCategoryX';

import { Header } from '@/components/Header';

export default async function Page() {
  const prisma_res = await prisma.resource.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      link: true,
      imagelink: true,
      typeId: true,
      categories: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    where: {
      blockchains: {
        some: {
          title: {
            equals: 'Bitcoin',
          },
        },
      },
    },
  });

  const bitcoin_core = prisma_res.filter((res: any) => res.categories.at(0)?.title === 'Developer core');
  const bitcoin_light = prisma_res.filter((res: any) => res.categories.at(0)?.title === 'Blocks');
  const books = prisma_res.filter((res: any) => res.categories.at(0)?.title === 'Books');
  const x_accounts = prisma_res.filter((res: any) => res.categories.at(0)?.id === 'Medias');

  return (
    <main>
      <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm lg:flex fixed bg-white"
        showArrow={isBitcoinPage} // Passez showArrow à true si vous êtes sur la page Bitcoin
      />
      <Banner />
      <div className="flex items-center">
        <div className="flex justify-center items-center my-8 mb-[12%] max-md:flex-col w-full">
          <h2 className="font-bold text-xl max-md:mb-[30px] mr-[20px]">
            Bitcoin Core
          </h2>
          <CarouselCategoryX resources={bitcoin_core} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex justify-center items-center my-8 mb-[12%] max-md:flex-col w-full">
          <h2 className="font-bold text-xl max-md:mb-[30px] mr-[20px]">
            Bitcoin Lightning
          </h2>
          <CarouselCategoryX resources={bitcoin_light} />
        </div>
      </div>
      <div className="flex justify-center items-center my-8 mb-[12%] max-md:flex-col">
        <h2 className="font-bold text-xl max-md:mb-[30px] mr-[20px]">Books</h2>
        <CarouselSize books={books} />
      </div>
      <div className="flex items-center">
        <div className="flex justify-center items-center my-8 mb-[12%] max-md:flex-col w-full">
          <h2 className="font-bold text-xl max-md:mb-[30px] mr-[20px]">
            Medias
          </h2>
          <CarouselMedia medias={x_accounts} />
        </div>
      </div>
    </main >
  );
}
