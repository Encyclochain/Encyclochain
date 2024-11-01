import prisma from '@/lib/db';

interface SectionInfoProps {
  page: string;
}

export default async function TopicInfo({ page }: SectionInfoProps) {
  // Appel à Prisma pour récupérer les informations de sectionInfo
  const topicInfo = await prisma.topicInfo.findFirst({
    where: {
      topic: {
        title: {
          equals: page,
        },
      },
    },
    select: {
      
      websiteLink: true,
    
    },
  });

  if (!topicInfo) {
    return <div>Informations indisponibles pour ce Topic.</div>;
  }

  const {
    websiteLink,
  
  } = topicInfo;

  return (
    <aside className="w-full lg:w-[30%] bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Informations sur la Blockchain</h2>
      <ul className="space-y-2">
     
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
