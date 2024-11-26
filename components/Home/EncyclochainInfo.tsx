import prisma from '@/lib/db';

export default async function EncyclochainInfo() {
  // Fetches the section information for "Encyclochain" using Prisma.
  const sectionInfo = await prisma.sectionInfo.findFirst({
    where: {
      section: {
        title: {
          equals: "Encyclochain", // Matches the section with the title "Encyclochain".
        },
      },
    },
    select: {
      color: true, // Fetches the associated color of the section.
      whitepaperLink: true, // Fetches the link to the whitepaper.
      twitterLink: true, // Fetches the Twitter profile link.
      websiteLink: true, // Fetches the official website link.
      creator: true, // Fetches the name or identifier of the creator.
      consensus: true, // Fetches the consensus mechanism used.
    },
  });

  // Handles the case where no section information is found.
  if (!sectionInfo) {
    return <div className='font-poppins'>Informations not available.</div>;
  }

  // Destructure the sectionInfo object for easy access.
  const {
    color,
    whitepaperLink,
    twitterLink,
    websiteLink,
    creator,
    consensus,
  } = sectionInfo;

  return (
    <aside className="w-full lg:w-[30%] bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm">
      <ul className="space-y-2">
        {/* Displays the creator if available */}
        {creator && (
          <li>
            <strong>Créateur</strong> : {creator}
          </li>
        )}
        {/* Displays the consensus mechanism if available */}
        {consensus && (
          <li>
            <strong>Type de consensus</strong> : {consensus}
          </li>
        )}
        {/* Displays the associated color with inline styling */}
        {color && (
          <li>
            <strong>Couleur associée</strong> : <span style={{ color }}>{color}</span>
          </li>
        )}
        {/* Displays a link to the whitepaper if available */}
        {whitepaperLink && (
          <li>
            <strong>Whitepaper</strong> :{' '}
            <a
              href={whitepaperLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le whitepaper
            </a>
          </li>
        )}
        {/* Displays a link to the Twitter account if available */}
        {twitterLink && (
          <li>
            <strong>Twitter</strong> :{' '}
            <a
              href={twitterLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Compte Twitter
            </a>
          </li>
        )}
        {/* Displays a link to the official website if available */}
        {websiteLink && (
          <li>
            <strong>Site officiel</strong> :{' '}
            <a
              href={websiteLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visiter le site
            </a>
          </li>
        )}
      </ul>
    </aside>
  );
}
