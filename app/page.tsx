import { Header } from "@/components/Header"; // Importing the Header component
import { Alltopics } from "@/components/Home/AllTopics"; // Importing the Alltopics component

// The Home component
export default function Home() {
  return (
    <main className="flex flex-col items-center "> {/* Main container for layout, flexbox column */}

      <Header
        design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm flex"
      /> {/* Header component with custom design and layout */}

      <div className="w-full p-[20px] lg:hidden"> {/* Empty div for spacing on smaller screens */}
      </div>

      <p className="text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline mt-[20px] leading-tight tracking-tighter lg:hidden">
        Blockchains encyclopedia
      </p> {/* A title that's visible only on small screens (lg:hidden) */}

      <Alltopics /> {/* Alltopics component to render the list of topics */}
    </main>
  );
}
