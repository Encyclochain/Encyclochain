"use client"; 

import * as React from "react";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import bookBit from '../../public/articles/bitcoinmagazine.png';
import { CarouselPagination } from "./CarouselPagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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

interface CarouselSizeProps {
  Medias: Article[];
}

export function CarouselMedia({ Medias }: CarouselSizeProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[80%] max-sm:w-[90%]"
      setApi={setApi}
    >
      <CarouselContent className="max-sm:pl-0 gap-[10%]">
        {Medias.map((Medias) => (
          <CarouselItem key={Medias.articleId} className="max-md:basis-1/1 md:basis-[380px] max-md:h-[100%] h-[300px] flex items-center">
            <div className="w-[100%]">
              <Card className=" w-[100%] h-[100%]">
                <CardContent className="flex items-center justify-center w-[100%] h-[100%]">
                  <a href={Medias.webLink} className=" w-[100%] h-[100%] flex flex-col justify-between">
                    <div>
                      <Image src={bookBit} alt={Medias.title} layout="responsive" width={645} height={240} style={{ objectFit: 'cover' }}/>
                    </div>
                    {/* <h3 className='font-semibold mx-3 mb-6'>{Medias.title}</h3>*/}
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext/>
      <CarouselPagination api={api}/>
    </Carousel>
  );
}
