import prisma from '@/lib/db';


export default async function EncyclochainInfo() {
  // Appel à Prisma pour récupérer les informations de sectionInfo
  const sectionInfo = await prisma.sectionInfo.findFirst({
    where: {
      section: {
        title: {
          equals: "Encyclochain",
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
    return <div className='font-poppins'>Informations not available.</div>;
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
