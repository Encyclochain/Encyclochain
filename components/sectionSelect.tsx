import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


// Fonction pour récupérer les sections groupées par type de section
export async function getSectionsGroupedByType() {
  return await prisma.sectionType.findMany({
    select: {
      id: true,
      title: true, // Type de section (ex: "Layer 1")
      sections: {
        select: {
          id: true,
          title: true, // Titre de la section
          sectionInfo: {
            select: {
              color: true,
              imageLink: true,
            },
          },
        },
      },
    },
  });
}

  export async function SectionSelect() {
    const sectionTypes = await getSectionsGroupedByType();
  
   
    return (
      <div className="mt-[5%] mb-[5%] p-[50px] w-full">
        {sectionTypes.map((sectionType) => (
          // Vérifier si le sectionType a des sections associées avant de l'afficher
          sectionType.sections.length > 0 && (
            <div key={sectionType.id} className="mb-[50px]">
              {/* Titre du type de section (ex: "Layer 1") */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6 lg:text-left text-center">
                {/* Utilisation de lg:text-left pour l'alignement à gauche sur grands écrans et text-center pour mobile */}
                {sectionType.title} {/* Afficher le titre du sectionType */}
              </h2>
  
              {/* Carrousel pour les sections de ce type */}
              <Carousel className="w-[80%] max-sm:w-[90%] mx-auto">
                <CarouselContent className="flex gap-6">
                  {sectionType.sections.map((section) => (
                    <CarouselItem key={section.id} className="flex flex-col items-center w-[30%]">
                      {/* Image de la section */}
                      <img
                        src={section.sectionInfo?.imageLink || ""}
                        alt={`Logo ${section.title}`}
                        className="dark:invert h-auto"
                        width={185}
                        height={24}
                      />
  
                      {/* Bouton pour explorer la section */}
                      <Button
                        className="mt-4 px-4 py-2 text-white rounded-md"
                        style={{
                          backgroundColor: section.sectionInfo?.color || "#000", // Couleur dynamique
                        }}
                      >
                        <Link href={`/section/${section.title}`}>
                          Explore {section.title}
                        </Link>
                      </Button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )
        ))}
      </div>
    );
  }