import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Imports pour l'utilisation de link preview
import { LinkPreview, PreviewData } from "../LinkPreview";
import { extractMetaTags } from "@/lib/extractMeta";

interface Carousel_ImgTopProps {
  resources: Array<any>;
  color: string;  // Ajout de la couleur comme prop
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
            var data = null;

            // Données par défaut si aucune donnée valide n'est trouvée
            var formatData: PreviewData = {
              title: "No title",
              description: "No description",
              image: "nopic",
              url: "",
            };

            try {
              data = await extractMetaTags(res.link);
              if (!data || data === null) {
                return null;
              }

              // Si les données reçues sont correctes, copie-les dans formatData
              formatData.title = data.title;
              formatData.description = data.description;
              formatData.image = data.image;
              formatData.url = res.link;
            } catch (e) {
              console.error("Carousel error : ", e);
              return null;
            }

            return (
              <CarouselItem key={res.id} className="md:basis-1/2 lg:basis-1/3 h-[100%] pr-[5%] flex items-center font-poppins">
                {/* Passer la couleur au composant LinkPreview */}
                <LinkPreview data={formatData} color={color} />
              </CarouselItem>
            );
          }))} {/* Fermeture du Promise.all */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
