"use client"

import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "./StarRating";  // Import du nouveau composant de notation
import { RxExternalLink } from "react-icons/rx";
import { VscBookmark } from "react-icons/vsc"; // Import de l'icône


// Interface contenant les données nécessaires
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
      <Card className="w-[100%] h-[500px]">
        <CardContent className="relative flex items-center w-[100%] h-[404px] md:h-[350px]"> {/* Ajout de la classe relative */}
          <a
            href={data.url}
            className="w-[100%] flex flex-col h-[500px] justify-between mt-[150px] max-md:mt-[90px]"
            target="blank"
          >
            <img
              src={imageSrc}
              alt={data.title}
              style={{ objectFit: "cover" }}
              className="w-[100%] h-[226px]"
            />
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2 mb-[10px]">
                <Badge variant="secondary">Blockchain</Badge>
                <p className="text-sm">5 min read</p>
              </div>
              <h3 className="font-semibold pb-2">{data.title}</h3>
              <p>{data.description}</p>
            </div>

            {/* Intégration du composant StarRating */}
            <StarRating initialRating={3} />  {/* Exemple avec une note initiale à 3 */}

            <div className="flex flex-col w-full pr-[20px] ml-[10px]">
              <div className="flex justify-start gap-[10px]">
                <p>Author: John Doe</p>
                <p>Date: Oct 1, 2023</p>
              </div>
              <div className="flex justify-end pb-[10px] w-[100%]">
                <RxExternalLink width={24} height={24} />
              </div>
            </div>
          </a>
          {/* Bouton placé en dehors de la balise a */}
          <button
            className="absolute top-[240px] right-3 cursor-pointer z-10"
            onClick={(e) => {
              e.preventDefault();
              // Ajoutez ici la logique pour ajouter à la watchlist
            }}
          >
            <VscBookmark size={24} />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
