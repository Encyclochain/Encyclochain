// frontend/src/pages/index.tsx

import fs from "fs";
import path from "path";

import { CarouselSize } from "../../components/Carousel/CarouselBooks";
import { CarouselMedia } from "../../components/Carousel/CarouselMedia";
import { CarouselCategoryX } from "../../components/Carousel/CarouselCategoryX";

import { Header } from "@/components/Header";

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
  const filePath = path.join(process.cwd(), "article.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const articles: Article[] = JSON.parse(jsonData);
  const articlesInCategoryX = articles.filter(
    (article: Article) => article.category === "X"
  );
  const books = articles.filter(
    (article: Article) => article.category === "Books"
  );
  const medias = articles.filter(
    (article: Article) => article.category === "Medias"
  );

  return (
    <main>
      <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm lg:flex fixed bg-white" />
      <div className="bg-[#F7931A] flex h-[54vh] justify-center items-center flex-col">
        <h1 className="text-white text-[104px] font-semibold max-md:text-[80px]">
          ₿ITCOIN
        </h1>
        <a
          href="https://bitcoin.org/bitcoin.pdf"
          className="bg-white text-[#F7931A] px-6 py-3 rounded-sm font-medium"
        >
          Whitepaper
        </a>
      </div>
      <div className="flex items-center">
        <div className="flex justify-center items-center my-8 mb-[20vh] max-md:flex-col w-full">
          <h2 className="font-bold text-xl max-md:mb-[40px] mr-[20px]">
            Category X
          </h2>
          <CarouselCategoryX articles={articlesInCategoryX} />
        </div>
      </div>
      <div className="flex justify-center items-center my-8 mb-[20vh] max-md:flex-col">
        <h2 className="font-bold text-xl max-md:mb-[40px] mr-[20px]">Books</h2>
        <CarouselSize books={books} />
      </div>
      <div className="flex items-center">
        <div className="flex justify-center items-center my-8 mb-[20vh] max-md:flex-col">
          <h2 className="font-bold text-xl max-md:mb-[40px] mr-[20px]">
            Medias
          </h2>
          <CarouselMedia Medias={medias} />
        </div>
      </div>
    </main>
  );
}
