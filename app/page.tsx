
import { Header } from "@/components/Header";
import { AllTopics } from "@/components/Home/AllTopics";

export default function Home() {
  return (

    <main className="flex  flex-col items-center ">
      
      <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm flex" />
      <div className="w-full p-[20px] lg:hidden">
      </div>

      <p className="text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline  mt-[20px] leading-tight tracking-tighter lg:hidden">
        Blockchains encyclopedia
      </p>
        <AllTopics />
    </main>

  );
}
