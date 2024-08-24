import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

//imports for link preview usage
import { LinkPreview, PreviewData } from "../LinkPreview";
import { extractMetaTags } from "@/lib/extractMeta";

interface CarouselCategoryXProps {
  resources: Array<any>;
}

export async function CarouselCategoryX({ resources }: CarouselCategoryXProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[80%] max-sm:w-[90%]"
    >
      <CarouselContent className="gap-[8%] max-sm:pl-0">
        {//async map to request preview data for each url
          await Promise.all(resources.map(async (res) => {
            var data = null;

            //creating return data with default values
            var formatData: PreviewData = { title: "No title", description: "No description", image: "nopic", url: "" };

            try {
              data = await extractMetaTags(res.link);
              if (!data || data === null) {
                return null;
              }
              //if received data is correct, copy it to formatData
              formatData.title = data.title;
              formatData.description = data.description;
              formatData.image = data.image;
              formatData.url = res.link;
            } catch (e) {
              console.error("Carousel error : ", e);
              return null;
            }

            return (
              <CarouselItem key={res.id} className="md:basis-1/2 lg:basis-1/3 h-[100%] pr-[5%] flex items-center">
                <LinkPreview data={formatData} />
              </CarouselItem>
            );
          }))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel >
  );
}
