import { Header } from "@/components/Header";
import { Alltopics } from "@/components/Home/AllTopics";
import EncyclochainInfo from "@/components/Home/EncyclochainInfo";
import EncyclochainContent from "@/components/Home/EncyclochainContent";
import prisma from "@/lib/db";

async function getEncyclochainContent() {
  // Requête Prisma pour récupérer uniquement les chapitres du topic "Encyclochain"
  const chapters = await prisma.chapter.findMany({
    where: {
      topic: {
        title: "Encyclochain", // Filtrage pour le topic "Encyclochain"
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });
  return chapters;
}

export default async function Home() {
  const chapters = await getEncyclochainContent();

  return (
    <main className=" container mx-auto px-4 py-8">
      <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm flex" />

      <div className="w-full p-[20px] lg:hidden"></div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%]">
          {/* Passer les chapitres en tant que props à EncyclochainContent */}
          <EncyclochainContent chapters={chapters} />
        </div>
        <EncyclochainInfo />
      </div>

      <Alltopics />
    </main>
  );
}
