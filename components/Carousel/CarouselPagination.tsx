"use client"; // Ajoutez cette directive en haut du fichier

import * as React from "react";
import { type CarouselApi } from "@/components/ui/Carousel";

interface CarouselPaginationProps {
  api: CarouselApi | undefined;
}

export function CarouselPagination({ api }: CarouselPaginationProps) {
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="py-2 text-center text-sm text-muted-foreground max-md:block hidden">
        Slide {current} of {count}
      </div>
  );
}
