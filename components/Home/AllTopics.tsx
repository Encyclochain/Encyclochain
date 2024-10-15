import prisma from "@/lib/db";  // Import the Prisma client for database access
import Link from "next/link";  // Import Link component for navigation
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";  // Import Table components
import Image from "next/image";  // Import Image component from Next.js

// Function to retrieve sections grouped by their type from the database using Prisma
export async function getSectionsGroupedByType() {
  return await prisma.Topic.findMany({
    select: {
      id: true,  // Retrieve section type ID
      title: true,  // Retrieve section type title (e.g., "Layer 1")
      sections: {
        select: {
          id: true,  // Retrieve section ID
          title: true,  // Retrieve section title
          sectionInfo: {  // Retrieve section information such as color and image link
            select: {
              color: true,  // Retrieve color information
              imageLink: true,  // Retrieve image link
            },
          },
        },
      },
    },
  });
}

// Main function to display all topics grouped by section type
export async function Alltopics() {
  // Fetch section types with their sections
  const topics = await getSectionsGroupedByType();

  return (
    <div className="mt-[5%] mb-[5%] p-[50px] w-full">
      {/* Loop through each section type */}
      {topics.map((topic) => (
        <div key={topic.id} className="mb-8">
          {/* Display the section type title */}
          <h2 className="text-3xl font-bold text-black mb-6 lg:text-left text-center">
            {topic.title}
          </h2>

          {/* Render a table for each section type */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-2">Section</TableHead>  {/* En-tête pour la colonne combinée */}
                <TableHead className="py-2">Colonne 2</TableHead>  {/* Colonne de remplacement 2 */}
                <TableHead className="py-2">Colonne 3</TableHead>  {/* Colonne de remplacement 3 */}
              </TableRow>
            </TableHeader>

            {/* Loop through sections of the current section type */}
            <TableBody>
              {topic.sections.map((section) => (
                <TableRow key={section.id}>
                  <Link
                    href={`/section/${section.title}`}  // Link to section page
                    className="contents text-black hover:bg-gray-100"
                  >
                    {/* Cellule combinée pour l'image et le titre */}
                    <TableCell className="py-2">
                      <div className="flex items-center">
                        <div className="w-[60px] h-[60px] relative mr-4">
                          <Image
                            src={section.sectionInfo?.imageLink || ""}  // Fallback to an empty string if imageLink is missing
                            alt={`Logo ${section.title}`}  // Alt text for the image
                            layout="fill"
                            objectFit="contain"
                            className="dark:invert"  // Invert the image colors in dark mode
                          />
                        </div>
                        <span className="text-base font-semibold">{section.title}</span>
                      </div>
                    </TableCell>

                    {/* Cellules de remplacement pour les futures données */}
                    <TableCell className="py-2">À définir</TableCell>  {/* Placeholder for third column */}
                    <TableCell className="py-2">À définir</TableCell>  {/* Placeholder for fourth column */}
                  </Link>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
