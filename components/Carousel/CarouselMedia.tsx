"use client";

import * as React from "react";
import Image from 'next/image';

import { Card, CardContent } from "@/components/ui/Card"; // Card components for media display
import { CarouselPagination } from "./CarouselPagination"; // Pagination for the carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"; // Carousel components
import useEmblaCarousel from "embla-carousel-react"; // Import the Embla carousel hook to control carousel behavior

// Props interface to define the type of data passed to the CarouselMedia component
interface CarouselSizeProps {
  medias: Array<any>; // Array of media items
}

// The CarouselMedia component for rendering a media carousel
export function CarouselMedia({ medias }: CarouselSizeProps) {
  // State to hold the Embla carousel API instance
  const [api, setApi] = React.useState<ReturnType<typeof useEmblaCarousel>[1]>();

  return (
    <Carousel
      opts={{
        align: "start", // Aligns the carousel items to the start
      }}
      className="w-[80%] max-sm:w-[90%]" // CSS classes for width adjustments on different screen sizes
      setApi={setApi} // Set the carousel API once initialized
    >
      <CarouselContent className="max-sm:pl-0 gap-[10%]">
        {medias.map((media) => (
          // Render each media item inside a carousel item
          <CarouselItem key={media.id} className="max-md:basis-1/1 md:basis-[380px] max-md:h-[100%] h-[300px] flex items-center">
            <div className="w-[100%]">
              <Card className=" w-[100%] h-[100%]"> {/* Card to wrap each media */}
                <CardContent className="flex items-center justify-center w-[100%] h-[100%]">
                  {/* Link to the media page */}
                  <a href={media.link} className=" w-[100%] h-[100%] flex flex-col justify-between">
                    <div>
                      {/* Media image displayed inside the card */}
                      <Image 
                        src={media.imagelink} 
                        alt={media.title} 
                        layout="responsive" 
                        width={645} 
                        height={240} 
                        style={{ objectFit: 'cover' }} // Ensures the image covers the available space
                      />
                    </div>
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Carousel navigation buttons */}
      <CarouselPrevious  /> {/* Button to scroll to the previous item */}
      <CarouselNext /> {/* Button to scroll to the next item */}
      <CarouselPagination api={api} /> {/* Pagination component to display the current slide and total */}
    </Carousel>
  );
}
