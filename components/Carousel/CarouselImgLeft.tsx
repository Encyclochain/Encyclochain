"use client"; // Marks this component as a client-side component

import * as React from "react";
import Image from "next/image"; // Next.js Image component for optimized images
import { Card, CardContent } from "@/components/ui/Card"; // UI components for Card layout
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"; // Carousel components
import useEmblaCarousel from "embla-carousel-react"; // Carousel hook to handle carousel functionality
import { CarouselPagination } from "./CarouselPagination"; // Custom pagination for the carousel

// Props interface for the Carousel_ImgLeft component
interface Carousel_ImgLeftProps {
  books: Array<any>; // Array of book data
}

// Carousel_ImgLeft component to display books in a carousel
export function Carousel_ImgLeft({ books }: Carousel_ImgLeftProps) {
  // State to hold the Embla carousel API
  const [api, setApi] = React.useState<ReturnType<typeof useEmblaCarousel>[1]>(); 

  return (
    <Carousel
      opts={{
        align: "start", // Align the carousel items to the start
      }}
      className="w-[80%] max-sm:w-[90%]" // Responsive width for different screen sizes
      setApi={setApi} // Sets the API of the Embla carousel
    >
      <CarouselContent className="gap-[8%] max-sm:pl-0"> {/* Carousel content container with spacing */}
        {books.map((book) => ( // Iterating over the books array
          <CarouselItem
            key={book.id} // Each book should have a unique ID
            className="max-md:basis-1/1 md:basis-[380px] h-[300px]" // Style adjustments for different screen sizes
          >
            <div className="w-[100%] h-[100%]">
              <Card className="w-[100%] h-[100%] rounded-none"> {/* Card component for each book */}
                <CardContent className="flex items-center justify-center w-[100%] h-[100%]">
                  <a
                    href={book.link} // Link to the book details
                    className="w-[100%] h-[100%] flex flex-row gap-4" // Layout for book image and description
                  >
                    <div>
                      {/* Next.js Image component for optimized book cover image */}
                      <Image
                        src={book.imagelink} // Book cover image
                        alt={book.title} // Alt text for accessibility
                        layout="cover" // Ensures the image fills the container
                        width={645}
                        height={300}
                        className="w-[100%] h-[300px] object-cover max-md:object-contain max-md:w-[auto] max-md:pl-[10px]" // Styling for responsiveness
                      />
                    </div>
                    <div className="w-[50%] pt-3 pr-3"> {/* Description section next to the image */}
                      <h3 className="font-semibold pb-4">{book.title}</h3> {/* Book title */}
                      <p>{book.description}</p> {/* Book description */}
                    </div>
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Carousel navigation buttons */}
      <CarouselPrevious /> {/* Previous button */}
      <CarouselNext /> {/* Next button */}
      <CarouselPagination api={api} /> {/* Pagination component */}
    </Carousel>
  );
}
