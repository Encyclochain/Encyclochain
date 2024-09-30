import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Tabs defaultValue={sectionTypes[0]?.id.toString()}>
        <TabsList className="mb-4">
          {sectionTypes.map((sectionType) => (
            <TabsTrigger key={sectionType.id} value={sectionType.id.toString()}>
              {sectionType.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {sectionTypes.map((sectionType) => (
          <TabsContent key={sectionType.id} value={sectionType.id.toString()}>
            <h2 className="text-3xl font-bold text-black mb-6 lg:text-left text-center">
              {sectionType.title}
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-2">Image</TableHead>
                  <TableHead className="py-2">Titre</TableHead>
                  <TableHead className="py-2">Colonne 3</TableHead>
                  <TableHead className="py-2">Colonne 4</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionType.sections.map((section) => (
                  <TableRow key={section.id}>
                    <Link
                      href={`/section/${section.title}`}
                      className="contents text-black hover:bg-gray-100"
                    >
                      <TableCell className="py-2">
                        <div className="w-[60px] h-[60px] relative">
                          <Image
                            src={section.sectionInfo?.imageLink || ""}
                            alt={`Logo ${section.title}`}
                            layout="fill"
                            objectFit="contain"
                            className="dark:invert"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <span className="text-base font-semibold">{section.title}</span>
                      </TableCell>
                      <TableCell className="py-2">À définir</TableCell>
                      <TableCell className="py-2">À définir</TableCell>
                    </Link>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}