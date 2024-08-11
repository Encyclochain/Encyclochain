// frontend/src/pages/index.tsx

import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import prisma from '@/lib/db';
import discord from '../../assets/Social/Discord.svg';
import twitter from '../../assets/Social/twitter.svg';
import { CarouselSize } from '../../components/Carousel/CarouselBooks';
import { CarouselMedia } from '../../components/Carousel/CarouselMedia';
import { CarouselCategoryX } from '../../components/Carousel/CarouselCategoryX';
import { Banner } from "@/components/Blockchains/Banner";

interface gneh {
  articleId: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  link: string;
  imagelink: string;
  category: string;
  author: string;
}

export default async function Page() {
  const articles = await prisma.resource.findMany({
    where: {
      blockchains: {
        some: {
          title: {
            equals: 'Bitcoin',
          },
        },
      },
      categories: {
        some: {
          title: {
            equals: ''
          }
        }
      }
    },
  });

  const articles: Article[] = JSON.parse(jsonData);
  const articlesInCategoryX = articles.filter((article: Article) => article.category === "X");
  const books = articles.filter((article: Article) => article.category === "Books");
  const medias = articles.filter((article: Article) => article.category === "Medias");

  return (
    <main>
      <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm lg:flex fixed bg-white"
        showArrow={isBitcoinPage} // Passez showArrow à true si vous êtes sur la page Bitcoin
      />
      <Banner />
      <div className="flex items-center">
        <div className="flex justify-center items-center my-8 mb-[12%] max-md:flex-col w-full">
          <h2 className="font-bold text-xl max-md:mb-[30px] mr-[20px]">
            Category X
          </h2>
          <CarouselCategoryX articles={articlesInCategoryX} />
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
          <CarouselMedia Medias={medias} />
        </div>
      </div>
    </main >
  );
}
