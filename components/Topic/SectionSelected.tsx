import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

// Typage explicite des sections et sectionTypes
interface SectionInfo {
  color: string;
  imageLink: string | null;
}

interface Section {
  id: number;
  title: string;
  sectionInfo: SectionInfo | null;  // Correction ici pour autoriser null
}

interface SectionType {
  id: number;
  title: string;
  sections: Section[];
}

interface SectionSelectProps {
  page: string;
}

// Fonction pour récupérer les sections groupées par type via Prisma
async function getSectionsGroupedByType(page: string): Promise<SectionType | null> {
  const sectionType = await prisma.sectionType.findFirst({
    where: { title: page }, // Filtrer par le titre de la page
    select: {
      id: true,
      title: true,
      sections: {
        select: {
          id: true,
          title: true,
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

  return sectionType;
}

export default async function SectionSelect({ page }: SectionSelectProps) {
  const sectionType = await getSectionsGroupedByType(page);

  if (!sectionType) {
    return <p className="text-center">Aucune section trouvée pour ce type.</p>;
  }
  return (
    <div className="mt-[5%] mb-[5%] p-[50px] w-full">
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
          {sectionType.sections.map((section: Section) => (
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
    </div>
  );
}
