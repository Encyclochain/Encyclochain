// frontend/src/pages/index.tsx

import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import discord from '../../assets/Social/Discord.svg';
import twitter from '../../assets/Social/twitter.svg';
import { CarouselSize } from '../../components/Carousel/CarouselBooks';
import { CarouselMedia } from '../../components/Carousel/CarouselMedia';
import { CarouselCategoryX } from '../../components/Carousel/CarouselCategoryX';

interface Article {
  articleId: string;
  title: string;
  description: string;
  webLink: string;
  image: string;
  category: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default async function Page() {
  const filePath = path.join(process.cwd(), 'article.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const articles: Article[] = JSON.parse(jsonData);
  const articlesInCategoryX = articles.filter((article: Article) => article.category === "X");
  const books = articles.filter((article: Article) => article.category === "Books");
  const medias = articles.filter((article: Article) => article.category === "Medias");

  return (
    <>
      <div className="z-10 w-full items-center p-[20px] justify-between font-mono text-sm lg:flex fixed bg-white">
        <p className="text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter">
          Encyclochain
        </p>
        <p className="text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter hidden lg:block">
          Blockchains encyclopedia
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center gap-[30px] bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a href="https://x.com/Encyclochain" target="_blank">
            <div style={{ width: '20px', height: '24px', position: 'relative' }}>
              <Image
                src={twitter}
                alt="Twitter Logo"
                width={20}
                height={24}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </a>
          <div style={{ width: '20px', height: '24px', position: 'relative' }}>
            <Image
              src={discord}
              alt="Discord Logo"
                width={20}
                height={24}
                style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#F7931A] flex h-[54vh] justify-center items-center flex-col">
        <h1 className="text-white text-[104px] font-semibold">₿ITCOIN</h1>
        <a href="https://bitcoin.org/bitcoin.pdf" className="bg-white text-[#F7931A] px-6 py-3 rounded-sm font-medium">Whitepaper</a>
      </div>
      <div className='flex justify-center items-center my-8 mb-[20vh]'>
        <h2 className='font-bold text-xl'>Category X</h2>
        <CarouselCategoryX articles={articlesInCategoryX} />
      </div>
      <div className='flex justify-center items-center my-8 mb-[20vh]'>
        <h2 className='font-bold text-xl'>Books</h2>
        <CarouselSize books={books} />
      </div>
      <div className='flex justify-center items-center my-8 mb-[20vh]'>
        <h2 className='font-bold text-xl'>Medias</h2>
        <CarouselMedia Medias={medias} />
      </div>
    </>
  );
}
