import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";

// Imports for link preview usage
import { LinkPreview, PreviewData } from "../Section/LinkPreview"; // Import the LinkPreview component for rendering previews
import { extractMetaTags } from "@/lib/extractMeta"; // Import function to extract metadata from links

interface Carousel_ImgTopProps {
  resources: Array<any>; // The array of resources to be displayed in the carousel
  color: string;  // Adding a color prop to style the link preview components
}

// Carousel_ImgTop component that renders the media previews in a carousel
export async function Carousel_ImgTop({ resources, color }: Carousel_ImgTopProps) {
  return (
    <Carousel
      opts={{
        align: "start", // Align carousel items to the start
      }}
      className="w-[80%] max-sm:w-[90%]" // Responsive width adjustments for different screen sizes
    >
      <CarouselContent className="gap-[8%] max-sm:pl-0"> {/* Carousel content container with spacing */}
        {// Using async map to fetch preview data for each link
          await Promise.all(resources.map(async (res) => {
            var data = null;

            // Default data in case no valid preview data is found
            var formatData: PreviewData = {
              title: "No title", // Default title if none is found
              description: "No description", // Default description
              image: "nopic", // Default image placeholder
              url: "",
              id: ""
            };

            try {
              // Fetch the metadata from the link
              data = await extractMetaTags(res.link);
              if (!data || data === null) {
                return null; // Skip rendering if no data is found
              }

              // Copy the extracted data into the formatData object
              formatData.title = data.title;
              formatData.description = data.description;
              formatData.image = data.image;
              formatData.url = res.link;
            } catch (e) {
              console.error("Carousel error : ", e); // Handle errors during metadata extraction
              return null;
            }

            // Render each resource in a CarouselItem
            return (
              <CarouselItem key={res.id} className="md:basis-1/2 lg:basis-1/3 h-[100%] pr-[5%] flex items-center font-poppins">
                {/* Pass the preview data and color to the LinkPreview component */}
                <LinkPreview data={formatData} color={color} />
              </CarouselItem>
            );
          }))} {/* End of Promise.all */}
      </CarouselContent>
      {/* Carousel navigation buttons */}
      <CarouselPrevious /> {/* Previous button */}
      <CarouselNext  /> {/* Next button */}
    </Carousel>
  );
}
