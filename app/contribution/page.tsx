import { Header } from "@/components/Header";
import { ContributionContent } from "@/components/Contribution/ContributionContent";
import { SubmitSection } from "@/components/Contribution/SubmitSection";
import SubmitResource from "@/components/Contribution/SubmitRessources";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm flex" />
      <div className="w-full p-[20px] lg:hidden"></div>

      <div className="flex flex-col gap-8">
        <div className="w-full lg:w-[70%]">
          {/* Card contenant ContributionContent */}
          <ContributionContent />
        </div>

        {/* Conteneur flex pour les formulaires */}
        <div className="flex justify-center gap-4 mt-8">
          <div className="w-full lg:w-[70%]">
            <SubmitResource />
          </div>
          <div className="w-full lg:w-[70%]">
            <SubmitSection />
          </div>
        </div>
      </div>
    </main>
  );
}
