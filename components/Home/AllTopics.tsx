import prisma from "@/lib/db"; // Import the Prisma client for database access
import Link from "next/link"; // Import Link component for navigation
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"; // Import Table components
import Image from "next/image"; // Import Image component from Next.js

// Function to retrieve sections grouped by their type with additional counts of resources and categories
export async function getSectionsGroupedByType() {
  return await prisma.Topic.findMany({
    select: {
      id: true, // Retrieve section type ID
      title: true, // Retrieve section type title (e.g., "Layer 1")
      sections: {
        select: {
          id: true, // Retrieve section ID
          title: true, // Retrieve section title
          _count: {
            select: {
              resources: true, // Count the number of resources in each section
              categories: true, // Count the number of categories in each section
            },
          },
          sectionInfo: { // Retrieve section information such as color and image link
            select: {
              color: true, // Retrieve color information
              imageLink: true, // Retrieve image link
            },
          },
        },
      },
    },
  });
}

// Main function to display all topics grouped by section type
export async function Alltopics() {
  // Fetch section types with their sections, including counts for resources and categories
  const topics = await getSectionsGroupedByType();

  return (
    <div className="mt-[5%] mb-[5%] p-[50px] w-full ">
      {/* Loop through each section type */}
      {topics.map((Topic) => (
        <div key={Topic.id} className="mb-8 ">
          {/* Display the section type title */}
          <h2 className="text-3xl font-bold font-garamond text-black mb-6 lg:text-left text-center">
            {Topic.title}
          </h2>
          <Table className="rounded-md border">
            <TableHeader>
              <TableRow>
                <TableHead className="py-2 text-black text-base">Section</TableHead>
                <TableHead className="py-2 text-black text-base">Ressources</TableHead>
                <TableHead className="py-2 text-black text-base">Category</TableHead>
                <TableHead className="py-2 text-black text-base">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Topic.sections.map((Section) => (
                <TableRow key={Section.id}>
                  <TableCell className="py-2 w-[200px]">
                    <Link
                      href={`/section/${Section.title}`} // Link to section page
                      className="contents text-black hover:bg-gray-100 font-poppins"
                    >
                      <div className="flex items-center ">
                        <div className="w-[30px] h-[30px] relative mr-4">
                          {Section.sectionInfo?.imageLink ? (
                           <Image
                           src={Section.sectionInfo.imageLink}
                           alt={`Logo ${Section.title}`}
                           width={80}
                           height={80}
                           style={{ objectFit: 'cover' }}
                           className="rounded-full"
                         />
                         
                          ) : (
                            <span className="text-black font-bold text-xl font-garamond">
                            {Section.title.charAt(0).toUpperCase()}
                          </span>
                          )}
                        </div>
                        <div className="text-base font-poppins">{Section.title}</div>
                      </div>
                    </Link>
                  </TableCell>
                  {/* Display count of resources and categories */}
                  <TableCell className="py-2 w-[200px] font-poppins">
                    {Section._count.resources} 
                  </TableCell>
                  <TableCell className="py-2 w-[200px] font-poppins">
                    {Section._count.categories} 
                  </TableCell>
                  <TableCell className="py-2 w-[200px] font-poppins">Soon</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
