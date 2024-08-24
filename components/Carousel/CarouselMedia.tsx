"use client";

import * as React from "react";
import Image from 'next/image';

import { Card, CardContent } from "@/components/ui/card";
import { CarouselPagination } from "./CarouselPagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface CarouselSizeProps {
  medias: Array<any>;
}

export function CarouselMedia({ medias }: CarouselSizeProps) {
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
        {medias.map((media) => (
          <CarouselItem key={media.id} className="max-md:basis-1/1 md:basis-[380px] max-md:h-[100%] h-[300px] flex items-center">
            <div className="w-[100%]">
              <Card className=" w-[100%] h-[100%]">
                <CardContent className="flex items-center justify-center w-[100%] h-[100%]">
                  <a href={media.link} className=" w-[100%] h-[100%] flex flex-col justify-between">
                    <div>
                      <Image src={media.imagelink} alt={media.title} layout="responsive" width={645} height={240} style={{ objectFit: 'cover' }} />
                    </div>
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselPagination api={api} />
    </Carousel>
  );
}
