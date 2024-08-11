"use client";

import * as React from "react";
import Image from "next/image";
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
import { Button } from "../ui/button";


interface CarouselCategoryXProps {
  resources: Array<any>;
}

export function CarouselCategoryX({ resources }: CarouselCategoryXProps) {
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
        {resources.map((res) => (
          <CarouselItem
            key={res.id}
            className="max-md:basis-1/1 md:basis-[420px] h-[100%] flex items-center justify-center"
          >
            <div className="h-[100%]">
              <Card className=" w-[100%] h-[100%] border-none">
                <CardContent className="flex items-center justify-center w-[100%] h-[100%] md:h-[350px]">
                  <a
                    href={res.link}
                    className="w-[100%] flex flex-col gap-4"
                  >
                      <Image
                        src={res.imagelink}
                        alt={res.title}
                        layout="cover"
                        width={645}
                        height={240}
                        style={{ objectFit: "cover" }}
                        className="w-[100%]"
                      />
                    <div className="px-3 pb-3">
                      <h3 className="font-semibold pb-2">{res.title}</h3>
                      <p>{res.description}</p>
                    </div>
                    <Button className="bg-[#F7931A] hover:bg-[#F7931A] rounded-none w-max p-[20px] max-md:w-full max-md:rounded-[5px] top-5">
                      Explore
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext />
      <CarouselPagination api={api} />
    </Carousel>
  );
}
