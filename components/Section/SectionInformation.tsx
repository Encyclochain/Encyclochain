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
      section: {
        select: {
          title: true, // Récupère le titre du topic
        },
      },
    },
  });

  if (!sectionInfo) {
    return <div>Information not available for this section.</div>;
  }

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
      <h2 className="text-xl mb-4 font-poppins font-semibold ">{section.title}</h2>
      <ul className="space-y-2 font-poppins">
        {creator && (
          <li>
            <span className='font-semibold'>Creator</span> : {creator}
          </li>
        )}
        {consensus && (
          <li>
            <span className='font-semibold'>Consensus</span> : {consensus}
          </li>
        )}
        {color && (
          <li>
            <span className='font-semibold'>Color</span> : <span style={{ color }}>{color}</span>
          </li>
        )}
        {whitepaperLink && (
          <li>
            <span className='font-semibold'>Whitepaper</span>:{' '}
            <a href={whitepaperLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Click here
            </a>
          </li>
        )}
        {twitterLink && (
          <li>
            <span className='font-semibold'>Twitter</span> :{' '}
            <a href={twitterLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Click here
            </a>
          </li>
        )}
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
