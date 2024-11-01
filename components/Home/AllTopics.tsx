
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
      {topics.map((Topic) => (
        <div key={Topic.id} className="mb-8">
          {/* Display the section type title */}
          <h2 className="text-3xl font-bold font-garamond text-black mb-6 lg:text-left text-center">
            {Topic.title}
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-2 ">Section</TableHead>  {/* En-tête pour la colonne combinée */}
                <TableHead className="py-2 ">Category</TableHead>  {/* Colonne de remplacement 2 */}
                <TableHead className="py-2 ">Contribution</TableHead>  {/* Colonne de remplacement 3 */}
                <TableHead className="py-2 ">Price</TableHead>  {/* Colonne de remplacement 3 */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Topic.sections.map((Section) => (
                <TableRow key={Section.id}>
                  <TableCell className="py-2 w-[200px]">
                    <Link
                    href={`/section/${Section.title}`}  // Link to section page
                    className="contents text-black hover:bg-gray-100"
                  >  
                      <div className="flex items-center">
                        <div className="w-[30px] h-[30px] relative mr-4">
                          <Image
                            src={Section.sectionInfo?.imageLink || ""}  // Fallback to an empty string if imageLink is missing
                            alt={`Logo ${Section.title}`}  // Alt text for the image
                            width={60}
                            height={60}
                            style={{ objectFit: 'cover' }} // Invert the image colors in dark mode
                          />
                        </div>
                        <div className="text-base font-semibold">{Section.title}</div>
                      </div>
                      </Link>
                    </TableCell>
                    <TableCell className="py-2 w-[200px]">À définir</TableCell>  {/* Placeholder for third column */}
                    <TableCell className="py-2 w-[200px]">À définir</TableCell>  {/* Placeholder for fourth column */}
                    <TableCell className="py-2 w-[200px]">À définir</TableCell>  {/* Placeholder for fourth column */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
