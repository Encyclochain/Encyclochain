import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";

export async function SectionSelect() {
  const prisma_res = await prisma.sectionInfo.findMany({
    select: {
      id: true,
      color: true,
      imageLink: true,
      blockchain: {
        select: {
          title: true, // Récupère le titre de la blockchain
        },
      },
    },
  });

  console.log("Prisma Results:", prisma_res);


  return (
    <div className="mt-[5%] mb-[5%] flex w-full justify-between p-[50px] max-md:flex-wrap">
      {prisma_res.map((sectionInfo) => (
        <div key={sectionInfo.id} className="flex flex-col items-center gap-[20px] w-[25%] max-md:w-[40%] mb-[20px]">
          <img 
            src={sectionInfo.imageLink} 
            alt={`Logo ${sectionInfo.id}`} 
            className="dark:invert h-auto"
            width={185}
            height={24} 
          />
          <Button className={` mt-4 text-white bg-[${sectionInfo.color}]  `}>
            <Link href={`/blockchains/${sectionInfo.blockchain.title}`}> {/* Lien dynamique vers la section */}
              Explore {sectionInfo.blockchain.title}
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
