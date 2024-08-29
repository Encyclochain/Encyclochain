import prisma from "@/lib/db";

import { CarouselSize } from "../../components/Carousel/CarouselBooks";
import { CarouselMedia } from "../../components/Carousel/CarouselMedia";
import { CarouselCategoryX } from "../../components/Carousel/CarouselCategoryX";

import { Header } from "@/components/Header";
import { Banner } from "@/components/Blockchains/Banner";

export default async function Page() {
  //requesting all categories corresponding to Bitcoin with all resources linked
  const prisma_res = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      resources: {
        select: {
          id: true,
          title: true,
          description: true,
          link: true,
          imagelink: true,
          typeId: true,
        },
      },
    },
    where: {
      blockchains: {
        some: {
          title: {
            equals: "Bitcoin",
          },
        },
      },
    },
  });

  //TODO : real logic
  const isBitcoinPage = true;

  return (
    <main>
      <Header
        design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm lg:flex fixed bg-white"
        showArrow={isBitcoinPage} // Passez showArrow à true si vous êtes sur la page Bitcoin
      />
      <Banner />
      {
        //creating one carousel for each category (TODO : do not show empty categories)
        prisma_res.map((cat) =>
          cat.resources !== null ? (
            <div key={cat.id} className="flex items-center">
              <div className="flex justify-center items-center my-8 mb-[12%] max-md:flex-col w-full h-[500px]">
                <h2 className="font-bold text-xl max-md:mb-[30px] mr-[20px]">
                  {cat.title}
                </h2>
                <CarouselCategoryX resources={cat.resources} />
              </div>
            </div>
          ) : null
        )
      }
    </main>
  );
}
