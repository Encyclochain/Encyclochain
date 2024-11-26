import prisma from '@/lib/db';

interface SectionInfoProps {
  page: string; // Represents the section title used for querying the database.
}

export default async function SectionInfo({ page }: SectionInfoProps) {
  // Query the database using Prisma to fetch section information.
  const sectionInfo = await prisma.sectionInfo.findFirst({
    where: {
      section: {
        title: {
          equals: page, // Matches the section with the given title.
        },
      },
    },
    select: {
      color: true, // Section's representative color.
      whitepaperLink: true, // Link to the section's whitepaper.
      twitterLink: true, // Link to the section's Twitter profile.
      websiteLink: true, // Link to the section's official website.
      creator: true, // Creator's name or identifier.
      consensus: true, // Consensus mechanism used.
      section: {
        select: {
          title: true, // Section title.
        },
      },
    },
  });

  if (!sectionInfo) {
    // Fallback if no section data is found.
    return <div>Information not available for this section.</div>;
  }

  // Destructure the queried data for ease of use.
  const {
    color,
    whitepaperLink,
    twitterLink,
    websiteLink,
    creator,
    consensus,
    section
  } = sectionInfo;

  return (
    <aside className="w-full lg:w-[30%] bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm">
      {/* Section Title */}
      <h2 className="text-xl mb-4 font-poppins font-semibold ">{section.title}</h2>
      <ul className="space-y-2 font-poppins">
        {/* Render creator if available */}
        {creator && (
          <li>
            <span className='font-semibold'>Creator</span> : {creator}
          </li>
        )}
        {/* Render consensus mechanism if available */}
        {consensus && (
          <li>
            <span className='font-semibold'>Consensus</span> : {consensus}
          </li>
        )}
        {/* Render color with inline styling if available */}
        {color && (
          <li>
            <span className='font-semibold'>Color</span> : <span style={{ color }}>{color}</span>
          </li>
        )}
        {/* Render whitepaper link if available */}
        {whitepaperLink && (
          <li>
            <span className='font-semibold'>Whitepaper</span>:{' '}
            <a href={whitepaperLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Click here
            </a>
          </li>
        )}
        {/* Render Twitter link if available */}
        {twitterLink && (
          <li>
            <span className='font-semibold'>Twitter</span> :{' '}
            <a href={twitterLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Click here
            </a>
          </li>
        )}
        {/* Render website link if available */}
        {websiteLink && (
          <li>
            <span className='font-semibold'>Website</span>:{' '}
            <a href={websiteLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Visit the website
            </a>
          </li>
        )}
      </ul>
    </aside>
  );
}
