import prisma from '@/lib/db';

interface SectionInfoProps {
  page: string; // Represents the current page or topic title to query the database.
}

export default async function TopicInfo({ page }: SectionInfoProps) {
  // Fetches topic information and its website link using Prisma.
  const topicInfo = await prisma.topicInfo.findFirst({
    where: {
      topic: {
        title: {
          equals: page, // Filters topics by the title matching the provided `page`.
        },
      },
    },
    select: {
      websiteLink: true, // Fetches the website link for the topic.
      topic: {
        select: {
          title: true, // Fetches the title of the topic.
        },
      },
    },
  });

  if (!topicInfo) {
    // If no data is found, returns a fallback message.
    return <div className="font-poppins">Information not available for this Topic.</div>;
  }

  const { websiteLink, topic } = topicInfo; 
  // Destructures the fetched data for easy access.

  return (
    <aside className="w-full lg:w-[30%] bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm">
      {/* Displays the topic title */}
      <h2 className="text-xl font-bold mb-4 font-garamond">{topic.title}</h2>
      <ul className="space-y-2">
        {/* If a website link is available, renders a link to it */}
        {websiteLink && (
          <li className="font-poppins">
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
