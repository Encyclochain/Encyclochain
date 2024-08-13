// frontend/src/components/CarouselCategoryX.tsx

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

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

interface CarouselCategoryXProps {
  articles: Article[];
}

export function CarouselCategoryX({ articles }: CarouselCategoryXProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[80%]"
    >
      <CarouselContent>
        {articles.map((article) => (
          <CarouselItem
            key={article.articleId}
            className="md:basis-1/2 lg:basis-1/3 h-[100%] pr-[5%] flex items-center"
          >
            <div className="h-[100%]">
              <Card className=" w-[100%] h-[100%] ">
                <CardContent className="flex items-center justify-center w-[100%] h-[100%]">
                  <a
                    href={article.webLink}
                    className=" w-[100%] h-[100%] flex flex-col gap-7"
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "0",
                        paddingBottom: "37.21%",
                      }}
                    >
                      <Image
                        src={article.image}
                        alt={article.title}
                        layout="cover "
                        width={645}
                        height={240}
                        style={{ objectFit: "cover" }}
                        className="w-[100%]"
                      />
                    </div>
                    <div className="px-3 pb-3">
                      <h3 className="font-semibold pb-2">{article.title}</h3>
                      <p>{article.description}</p>
                    </div>
                    <Button className="bg-[#F7931A] hover:bg-[#F7931A]">
                      Explore
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
