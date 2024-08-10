import * as React from "react";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import bookBit from '../../public/articles/bitcoinmagazine.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[80%]"
    >
      <CarouselContent>
        {Medias.map((Medias) => (
          <CarouselItem key={Medias.articleId} className="md:basis-1/2 lg:basis-1/3 h-[320px] pr-[5%] flex items-center pb-[100px]">
            <div className="p-1 w-[100%]">
              <Card className=" w-[100%] h-[100%]">
                <CardContent className="flex items-center justify-center w-[100%] h-[100%]">
                  <a href={Medias.webLink} className=" w-[100%] h-[100%] flex flex-col justify-between">
                    <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '37.21%' }}>
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
      <CarouselNext />
    </Carousel>
  );
}
