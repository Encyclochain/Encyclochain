import prisma from "@/lib/db"; // Prisma ORM for database operations
import Link from "next/link"; // Next.js Link for client-side navigation
import Image from "next/image"; // Next.js Image component for optimized image loading
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"; // Importing table components for display

// Explicit typing for SectionInfo interface (allows null for imageLink)
interface SectionInfo {
  color: string | null;  // Color associated with the section
  imageLink: string | null;  // Image link (nullable)
}

// Typing for individual Section (allows null for sectionInfo)
interface Section {
  id: number;  // Section ID
  title: string;  // Section title
  sectionInfo: SectionInfo | null;  // Section information (nullable)
  resourcesCount: number; // Count of resources in the section
  categoriesCount: number; // Count of categories in the section
}

// Typing for topic, which groups sections
interface topic {
  id: number;  // topic ID
  title: string;  // Title of the topic
  sections: Section[];  // Array of sections under this type
}

// Props interface for the SectionSelect component
interface SectionSelectProps {
  page: string;  // Dynamic page title passed from the URL
}

// Function to retrieve sections grouped by type using Prisma
async function getSectionsGroupedByType(page: string): Promise<topic | null> {
  const topic = await prisma.Topic.findFirst({
    where: { title: page }, // Filter by the page title
    select: {
      id: true,  // Select topic ID
      title: true,  // Select topic title
      sections: {  // Select sections within this topic
        select: {
          id: true,  // Select section ID
          title: true,  // Select section title
          sectionInfo: {  // Select section info (color and image link)
            select: {
              color: true,
              imageLink: true,
            },
          },
          _count: {  // Count related resources and categories
            select: {
              resources: true,
              categories: true,
            },
          },
        },
      },
    },
  });

  // Format the topic data to include resources and categories count
  return topic
    ? {
        ...topic,
        sections: topic.sections.map((section) => ({
          ...section,
          resourcesCount: section._count.resources, // Number of resources
          categoriesCount: section._count.categories, // Number of categories
        })),
      }
    : null;
}

// React component to display sections grouped by type
export default async function SectionSelect({ page }: SectionSelectProps) {
  const topic = await getSectionsGroupedByType(page);  // Fetch section data based on the page title

  // If no topic is found, display a message
  if (!topic) {
    return <p className="text-center font-poppins">Aucune section trouvée pour ce type.</p>;
  }

  return (
    <div className="mt-[5%] mb-[5%] p-[50px] w-full">
      {/* Display the title of the topic */}
      <h2 className="text-3xl font-bold text-black mb-6 lg:text-left text-center font-garamond">
        {topic.title}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 font-poppins">Section</TableHead> {/* Section header */}
            <TableHead className="py-2 font-poppins">Ressources</TableHead> {/* Ressources header */}
            <TableHead className="py-2 font-poppins">Category</TableHead> {/* Category header */}
            <TableHead className="py-2 font-poppins">Price</TableHead> {/* Placeholder for Price */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {topic.sections.map((section: Section) => (
            <TableRow key={section.id}>
              <TableCell className="py-2">
                <Link
                  href={`/section/${section.title}`}  // Link to the section's page
                  className="contents text-black hover:bg-gray-100 font-poppins"  // Styling for the link
                >
                  <div className="flex items-center">
                    <div className="w-[30px] h-[30px] relative mr-4">
                      <Image
                        src={section.sectionInfo?.imageLink || ""} // Fallback to an empty string if imageLink is missing
                        alt={`Logo ${section.title}`} // Alt text for the image
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="text-base font-poppins">{section.title}</div>
                  </div>
                </Link>
              </TableCell>
              {/* Display the number of resources and categories for each section */}
              <TableCell className="py-2 font-poppins">{section.resourcesCount} </TableCell>
              <TableCell className="py-2 font-poppins">{section.categoriesCount} </TableCell>
              <TableCell className="py-2 font-poppins">À définir</TableCell> {/* Placeholder for Price */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
