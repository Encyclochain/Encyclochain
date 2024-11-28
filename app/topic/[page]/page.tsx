import { Header } from "@/components/Header"; // Importing the Header component
import SectionSelect from "@/components/Topic/SectionsList"; // Importing SectionSelect component
import TopicInfo from '@/components/Topic/TopicInfo';
import TopicContent from '@/components/Topic/TopicContent';



// Defining the PageProps interface for the page
interface PageProps {
  params: { page: string }; // Dynamic parameter from the URL
}

async function getBlockchainData(page: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topicContent/${encodeURIComponent(page)}`);
  
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des données : ${response.statusText}`);
  }

  const data = await response.json();
  return { chapters: data.chapters };
}


// Function component for the Home page
export default async function Home({ params }: PageProps) {
  // Decoding the page parameter to handle special characters like %20 (space)
  const page = decodeURIComponent(params.page);
  const {  chapters } = await getBlockchainData(page);


  return (
    <main className="container mx-auto px-4 py-8"> {/* Flexbox layout to center items */}
      {/* Render the Header component */}
      <Header
        design="z-10 w-full items-center p-5 justify-between font-mono text-sm flex mb-8"
        showArrow={true}
        pageTitle={page} 
      />
            
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%]">
          <TopicContent page={page} chapters={chapters} />
        </div>
        {/* Le composant SectionInfo fait maintenant son propre appel Prisma */}
        <TopicInfo page={page} />
      </div>

      {/* Conditionally show the title for smaller screens */}
      <p className="text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline mt-[20px] leading-tight tracking-tighter lg:hidden">
        Blockchains encyclopedia
      </p>

      {/* Pass the decoded page value to the SectionSelect component */}
      <SectionSelect page={page} />
    </main>
  );
}
