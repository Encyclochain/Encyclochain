import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

//interface contenant les données nécessaires
export interface PreviewData {
  title: string;
  description: string;
  image: string;
  url: string;
}

// Modification pour ajouter la prop color
export function LinkPreview({ data, color }: { data: PreviewData; color: string }) {
  // Utilise une image par défaut si l'image n'est pas disponible
  const imageSrc = data.image === "nopic" ? "assets/articles/bitcoinmagazine.png" : data.image;

  return (
    <div className="h-[100%] w-[100%]">
      <Card className="w-[100%] h-[500px] border-none">
        <CardContent className="flex items-center justify-between w-[100%] h-[404px] md:h-[350px]">
          <a
            href={data.url}
            className="w-[100%] flex flex-col h-[500px] justify-between mt-[158px] max-md:mt-[90px]"
            target="blank"
          >
            <img
              src={imageSrc}
              alt={data.title}
              style={{ objectFit: "cover" }}
              className="w-[100%] h-[226px]"
            />
            <div className="px-3 pb-3">
              <h3 className="font-semibold pb-2">{data.title}</h3>
              <p>{data.description}</p>
            </div>
            {/* Appliquer la couleur dynamique au bouton */}
            <Button
              className={`rounded-none w-max p-[20px] max-md:w-full max-md:rounded-[5px] top-5`}
              style={{ backgroundColor: color }}  // Utiliser la couleur dynamique ici
            >
              Explore
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
