import prisma from '@/lib/db';

interface SectionInfoProps {
  page: string;
}

export default async function SectionInfo({ page }: SectionInfoProps) {
  // Appel à Prisma pour récupérer les informations de sectionInfo
  const sectionInfo = await prisma.sectionInfo.findFirst({
    where: {
      section: {
        title: {
          equals: page,
        },
      },
    },
    select: {
      color: true,
      whitepaperLink: true,
      twitterLink: true,
      websiteLink: true,
      creator: true,
      consensus: true,
    },
  });

  if (!sectionInfo) {
    return <div>Informations indisponibles pour cette section.</div>;
  }

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
      <h2 className="text-xl font-bold mb-4">Informations sur la Blockchain</h2>
      <ul className="space-y-2">
        {creator && (
          <li>
            <strong>Créateur</strong> : {creator}
          </li>
        )}
        {consensus && (
          <li>
            <strong>Type de consensus</strong> : {consensus}
          </li>
        )}
        {color && (
          <li>
            <strong>Couleur associée</strong> : <span style={{ color }}>{color}</span>
          </li>
        )}
        {whitepaperLink && (
          <li>
            <strong>Whitepaper</strong> :{' '}
            <a href={whitepaperLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Voir le whitepaper
            </a>
          </li>
        )}
        {twitterLink && (
          <li>
            <strong>Twitter</strong> :{' '}
            <a href={twitterLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Compte Twitter
            </a>
          </li>
        )}
        {websiteLink && (
          <li>
            <strong>Site officiel</strong> :{' '}
            <a href={websiteLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Visiter le site
            </a>
          </li>
        )}
      </ul>
    
      
    </aside>
  );
}
