"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType, EmblaViewportRefType } from "embla-carousel-react"; // Carousel hook from Embla
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for carousel navigation
import { cn } from "@/lib/utils"; // Utility for conditional class names
import { Button } from "@/components/ui/Button"; // Custom Button component

// Type definitions for the Carousel API and options
type CarouselApi = UseEmblaCarouselType[1]; // Embla carousel API type
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]; // Carousel options type (axis, looping, etc.)
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1]; // Carousel plugins type

// Carousel component props
type CarouselProps = {
  opts?: CarouselOptions; // Carousel options
  plugins?: CarouselPlugin; // Carousel plugins
  orientation?: "horizontal" | "vertical"; // Orientation of the carousel (default is horizontal)
  setApi?: (api: CarouselApi) => void; // Function to expose the carousel API
};

// Context to provide carousel state and actions to its children
type CarouselContextProps = {
  carouselRef: EmblaViewportRefType; // Reference to the carousel viewport element
  scrollPrev: () => void; // Function to scroll to the previous slide
  scrollNext: () => void; // Function to scroll to the next slide
  canScrollPrev: boolean; // Boolean indicating if the carousel can scroll to the previous slide
  canScrollNext: boolean; // Boolean indicating if the carousel can scroll to the next slide
  orientation: "horizontal" | "vertical"; // Orientation of the carousel (horizontal or vertical)
};

// Creating the Carousel context
const CarouselContext = React.createContext<CarouselContextProps | null>(null);

// Hook to access the Carousel context
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// Main Carousel component
const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    // Initialize Embla carousel with options and plugins
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" }, // Set the axis based on the orientation
      plugins
    );

    // State to check if scrolling to the previous or next slide is possible
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    // Function to update scroll state (whether the carousel can scroll forward or backward)
    const updateScrollState = React.useCallback((api: CarouselApi) => {
      if (!api) return; // Ensure api is defined
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    // Scroll to the previous slide
    const scrollPrev = React.useCallback(() => {
      if (api) {
        api.scrollPrev();
      }
    }, [api]);

    // Scroll to the next slide
    const scrollNext = React.useCallback(() => {
      if (api) {
        api.scrollNext();
      }
    }, [api]);

    // Expose the API to the parent component if necessary
    React.useEffect(() => {
      if (setApi && api) setApi(api);
    }, [api, setApi]);

    // Add event listeners to update scroll state when the carousel is re-initialized or a slide is selected
    React.useEffect(() => {
      if (!api) return;
      updateScrollState(api);
      api.on("reInit", updateScrollState);
      api.on("select", updateScrollState);

      // Clean up event listeners when the component is unmounted
      return () => {
        if (api) {
          api.off("select", updateScrollState);
        }
      };
    }, [api, updateScrollState]);

    return (
      <CarouselContext.Provider value={{ carouselRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext, orientation }}>
        {/* Carousel wrapper */}
        <div ref={ref} className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
          {children} {/* Render carousel content */}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

// Carousel content container
const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel(); // Access the carousel context
  return (
    <div ref={carouselRef} className="overflow-hidden"> {/* Carousel viewport */}
      <div ref={ref} className={cn("flex pl-8", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// Individual Carousel item
const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel(); // Access the carousel context
  return (
    <div ref={ref} className={cn("shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)} {...props} />
  );
});
CarouselItem.displayName = "CarouselItem";

// Carousel navigation button (used for both "Previous" and "Next" buttons)
interface CarouselNavigationButtonProps extends React.ComponentProps<typeof Button> {
  direction: "prev" | "next"; // Direction to scroll (previous or next)
}

const CarouselNavigationButton = React.forwardRef<HTMLButtonElement, CarouselNavigationButtonProps>(
  ({ direction, ...props }, ref) => {
    const { orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel(); // Access the carousel context
    const isPrev = direction === "prev"; // Check if the button is for previous or next slide
    const handleClick = isPrev ? scrollPrev : scrollNext; // Assign the correct scroll function
    const isDisabled = isPrev ? !canScrollPrev : !canScrollNext; // Disable button if scrolling in that direction is not possible
    const ChevronIcon = isPrev ? ChevronLeft : ChevronRight; // Use the appropriate icon (left or right)

    return (
      <Button
        ref={ref}
        className={cn(
          "absolute h-[70px] w-[70px] rounded-full bg-transparent hover:bg-transparent",
          orientation === "horizontal"
            ? isPrev
              ? "left-[-24px] top-1/2 -translate-y-1/2"
              : "-right-16 top-1/2 -translate-y-1/2"
            : isPrev
            ? "-top-12 left-1/2 -translate-x-1/2 rotate-90"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90"
        )}
        disabled={isDisabled} // Disable button if scrolling is not possible
        onClick={handleClick} // Scroll to the appropriate direction when clicked
        {...props}
      >
        <ChevronIcon className="h-[70px] w-[70px] text-[#F7931A]" /> {/* Icon for navigation */}
        <span className="sr-only">{isPrev ? "Previous" : "Next"} slide</span> {/* Accessible label */}
      </Button>
    );
  }
);
CarouselNavigationButton.displayName = "CarouselNavigationButton";

// Export carousel components
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigationButton as CarouselPrevious, // Export CarouselPrevious as a named export
  CarouselNavigationButton as CarouselNext, // Export CarouselNext as a named export
};
