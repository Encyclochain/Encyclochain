
import { Header } from "@/components/Header";
import SectionSelect from "@/components/Topic/SectionSelected";

interface PageProps {
  params: { page: string }; // Dynamic parameter from the URL
}

// Fonction pour décoder l'URL et récupérer les sections
export default function Home({ params }: PageProps) {
  // Décoder la page pour remplacer %20 par des espaces
  const page = decodeURIComponent(params.page);

  return (
    <main className="flex flex-col items-center">
      <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm flex" />
      <div className="w-full p-[20px] lg:hidden">
    
      </div>

      <p className="text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline mt-[20px] leading-tight tracking-tighter lg:hidden">
        Blockchains encyclopedia
      </p>

      {/* Passer la page décodée à SectionSelect */}
      <SectionSelect page={page} />
    </main>
  );
}
