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
  color: string;  // Color associated with the section
  imageLink: string | null;  // Image link (nullable)
}

// Typing for individual Section (allows null for sectionInfo)
interface Section {
  id: number;  // Section ID
  title: string;  // Section title
  sectionInfo: SectionInfo | null;  // Section information (nullable)
}

// Typing for topic, which groups sections
interface topic {
  id: number;  // topic ID
  title: string;  // Title of the section type
  sections: Section[];  // Array of sections under this type
}

// Props interface for the SectionSelect component
interface SectionSelectProps {
  page: string;  // Dynamic page title passed from the URL
}

// Function to retrieve sections grouped by type using Prisma
async function getSectionsGroupedByType(page: string): Promise<topic | null> {
  const topic = await prisma.topic.findFirst({
    where: { title: page }, // Filter by the page title
    select: {
      id: true,  // Select section type ID
      title: true,  // Select section type title
      sections: {  // Select sections within this section type
        select: {
          id: true,  // Select section ID
          title: true,  // Select section title
          sectionInfo: {  // Select section info (color and image link)
            select: {
              color: true,
              imageLink: true,
            },
          },
        },
      },
    },
  });

  return topic;  // Return the topic or null if not found
}

// React component to display sections grouped by type
export default async function SectionSelect({ page }: SectionSelectProps) {
  const topic = await getSectionsGroupedByType(page);  // Fetch section data based on the page title

  // If no topic is found, display a message
  if (!topic) {
    return <p className="text-center">Aucune section trouvée pour ce type.</p>;
  }

  return (
    <div className="mt-[5%] mb-[5%] p-[50px] w-full">
      {/* Display the title of the section type */}
      <h2 className="text-3xl font-bold text-black mb-6 lg:text-left text-center">
        {topic.title}
      </h2>
      {/* Table structure for displaying sections */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2">Image</TableHead> {/* Image header */}
            <TableHead className="py-2">Titre</TableHead> {/* Title header */}
            <TableHead className="py-2">Colonne 3</TableHead> {/* Placeholder for column 3 */}
            <TableHead className="py-2">Colonne 4</TableHead> {/* Placeholder for column 4 */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Mapping through the sections and rendering a row for each */}
          {topic.sections.map((section: Section) => (
            <TableRow key={section.id}>
              <Link
                href={`/section/${section.title}`}  // Link to the section's page
                className="contents text-black hover:bg-gray-100"  // Styling for the link
              >
                {/* Section image (if available), otherwise an empty string */}
                <TableCell className="py-2">
                  <div className="w-[60px] h-[60px] relative">
                    <Image
                      src={section.sectionInfo?.imageLink || ""}  // Fallback to an empty string if no imageLink
                      alt={`Logo ${section.title}`}  // Alt text for the image
                      layout="fill"  // Make the image fill its container
                      objectFit="contain"  // Ensure image fits within the container
                      className="dark:invert"  // Invert colors in dark mode
                    />
                  </div>
                </TableCell>
                {/* Section title */}
                <TableCell className="py-2">
                  <span className="text-base font-semibold">{section.title}</span>
                </TableCell>
                {/* Placeholder columns for future content */}
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
