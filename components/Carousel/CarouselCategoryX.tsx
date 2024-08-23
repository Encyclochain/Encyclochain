import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";


import { LinkPreview } from "../LinkPreview";

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
          <CarouselItem key={res.id} className="md:basis-1/2 lg:basis-1/3 h-[100%] pr-[5%] flex items-center">
            <LinkPreview url={res.link} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselPagination api={api} />
    </Carousel>
  );
}
