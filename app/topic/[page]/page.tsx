import { Header } from "@/components/Header"; // Importing the Header component
import SectionSelect from "@/components/Topic/SectionsList"; // Importing SectionSelect component

// Defining the PageProps interface for the page
interface PageProps {
  params: { page: string }; // Dynamic parameter from the URL
}

// Function component for the Home page
export default function Home({ params }: PageProps) {
  // Decoding the page parameter to handle special characters like %20 (space)
  const page = decodeURIComponent(params.page);

  return (
    <main className="flex flex-col items-center"> {/* Flexbox layout to center items */}
      {/* Render the Header component */}
      <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm flex" />
      
      <div className="w-full p-[20px] lg:hidden"> {/* Add padding for small screens */}
        {/* This empty div is a placeholder for potential content or styling */}
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
