"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CarouselPagination } from "./CarouselPagination";

interface CarouselSizeProps {
  books: Array<any>;
}

export function CarouselSize({ books }: CarouselSizeProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[80%] max-sm:w-[90%]"
      setApi={setApi}
    >
      <CarouselContent className="gap-[8%] max-sm:pl-0">
        {books.map((book) => (
          <CarouselItem
            key={book.articleId}
            className="max-md:basis-1/1 md:basis-[380px] h-[300px]"
          >
            <div className="w-[100%] h-[100%]">
              <Card className="w-[100%] h-[100%] rounded-none">
                <CardContent className="flex items-center justify-center w-[100%] h-[100%]">
                  <a
                    href={book.webLink}
                    className=" w-[100%] h-[100%] flex  flex-row gap-4"
                  >
                    <div>
                      <Image
                        src={bookBit}
                        alt={book.title}
                        layout="cover"
                        width={645}
                        height={300}
                        className="w-[100%] h-[300px] object-cover max-md:object-contain max-md:w-[auto] max-md:pl-[10px]"
                      />
                    </div>
                    <div className="w-[50%] pt-3 pr-3">
                      <h3 className="font-semibold pb-4">{book.title}</h3>
                      <p>{book.description}</p>
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
