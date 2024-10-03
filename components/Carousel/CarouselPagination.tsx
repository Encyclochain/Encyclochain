"use client"; // Enables client-side rendering for this component

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react"; // Import the carousel hook from Embla

// Props for CarouselPagination, the `api` is the carousel API provided by Embla
interface CarouselPaginationProps {
  api: ReturnType<typeof useEmblaCarousel>[1] | undefined; // Carousel API, can be undefined initially
}

export function CarouselPagination({ api }: CarouselPaginationProps) {
  const [current, setCurrent] = React.useState(0); // Tracks the current slide
  const [count, setCount] = React.useState(0); // Tracks the total number of slides

  // Effect to update the slide count and current slide when the API is available
  React.useEffect(() => {
    if (!api) {
      return; // If api is not available, return early
    }

    setCount(api.scrollSnapList().length); // Set the total number of slides
    setCurrent(api.selectedScrollSnap() + 1); // Set the current slide (starts from 1)

    // Listener for carousel select events, updating the current slide on change
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1); // Update the current slide
    });
  }, [api]); // Dependency array includes the api

  return (
    <div className="py-2 text-center text-sm text-muted-foreground max-md:block hidden">
      {/* Display the current slide and the total count */}
      Slide {current} of {count}
    </div>
  );
}
