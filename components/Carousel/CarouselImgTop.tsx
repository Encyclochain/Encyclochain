import {
  Carousel,
  CarouselContent,
  CarouselItem,
   CarouselPrevious,
   CarouselNext,
} from "@/components/ui/Carousel";

// Imports pour l'utilisation de link preview
import { LinkPreview, PreviewData } from "../Section/LinkPreview";
import { extractMetaTags } from "@/lib/extractMeta";

interface Carousel_ImgTopProps {
  resources: Array<{
    id: number;
    title: string | null;  // Accepte null
    description: string | null;  // Accepte null
    link: string;
    imagelink: string | null;  // Accepte null
    typeId: number;
  }>;
  color: string;
}

export async function Carousel_ImgTop({ resources, color }: Carousel_ImgTopProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[80%] max-sm:w-[90%]"
    >
      <CarouselContent className="gap-[8%] max-sm:pl-0">
        {// Async map pour demander des données de preview pour chaque lien
          await Promise.all(resources.map(async (res) => {
            let data = null;

            // Données par défaut si aucune donnée valide n'est trouvée
            let formatData: PreviewData = {
              title: res.title || "No title",  // Si title est null, afficher un titre par défaut
              description: res.description || "No description",  // Si description est null
              image: res.imagelink || "nopic",  // Si imagelink est null
              url: res.link,
            };

            try {
              const metaData = await extractMetaTags(res.link);
              if (metaData) {
                formatData = {
                  ...formatData,
                  title: metaData.title || formatData.title,
                  description: metaData.description || formatData.description,
                  image: metaData.image || formatData.image,
                };
              }
            } catch (e) {
              console.error("Carousel error: ", e);
              // Garder les valeurs par défaut si l'extraction échoue
            }

            return (
              <CarouselItem
                key={res.id}
                className="md:basis-1/2 lg:basis-1/3 h-[100%] pr-[5%] flex items-center font-poppins"
              >
                {/* Passer la couleur au composant LinkPreview */}
                <LinkPreview data={formatData} color={color} />
              </CarouselItem>
            );
          }))
        }
      </CarouselContent>
      <CarouselPrevious direction="prev" />
      <CarouselNext direction="next" />
    </Carousel>
  );
}
