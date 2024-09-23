import prisma from "@/lib/db";
import { Header } from "@/components/Header";
import { Banner } from "@/components/Blockchains/Banner";
import { Carousel_ImgTop } from "@/components/Carousel/Carousel_ImgTop";

interface PageProps {
  params: { page: string };  // Utilise `params` pour récupérer le paramètre dynamique
}

// Fonction pour récupérer les données de la blockchain, y compris la couleur de la section
async function getBlockchainData(page: string) {
  // Récupérer la couleur et les informations de la section
  const sectionInfo = await prisma.sectionInfo.findFirst({
    where: {
      section: {
        title: {
          equals: page,
        },
      },
    },
    select: {
      color: true,
      whitepaperLink: true,
      twitterLink: true,
      websiteLink: true, // Récupère la couleur associée à la section
    },
  });

  // Récupérer les catégories et leurs ressources liées à la blockchain spécifique
  const prisma_res = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      resources: {
        where: {  // Filtrer les ressources liées à la blockchain
          sections: {
            some: {
              title: {
                equals: page,  // Filtre les ressources par blockchain
              },
            },
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
          link: true,
          imagelink: true,
          typeId: true,
        },
      },
    },
    where: {
      sections: {
        some: {
          title: {
            equals: page,  // Filtre les catégories par blockchain
          },
        },
      },
    },
  });

  return { sectionInfo, prisma_res };
}

export default async function Page({ params }: PageProps) {
  const { page } = params;  // Récupère le paramètre `page` de l'URL

  // Appelle la fonction pour obtenir les données de la blockchain
  const { sectionInfo, prisma_res } = await getBlockchainData(page);

  // Définir la couleur par défaut si aucune couleur n'est trouvée
  const sectionColor = sectionInfo?.color || "#F7931A";  // Couleur par défaut pour Bitcoin
  const whitepaperLink = sectionInfo?.whitepaperLink || "https://bitcoin.org/bitcoin.pdf";  // Lien par défaut si aucun lien dans la BDD

  return (
    <main>


      <Header
        design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm lg:flex fixed bg-white"
        showArrow={true}  // Affiche le bouton de retour si c'est Bitcoin
      />
      {/* Passer la couleur dynamique au composant Banner */}
      <Banner color={sectionColor} title={page} whitepaperLink={whitepaperLink} />
      {
        prisma_res.length > 0 ? (
          prisma_res.map((cat) => (
            cat.resources.length > 0 && (
              <div key={cat.id} className="flex items-center">
                <div className="flex justify-center items-center my-8 mb-[12%] max-md:flex-col w-full h-[500px]">
                  <h2 className="font-bold text-xl max-md:mb-[30px] mr-[20px] font-garamond">
                    {cat.title}
                  </h2>
                  <Carousel_ImgTop resources={cat.resources} color={sectionColor} />
                </div>
              </div>
            )
          ))
        ) : (
          <p className="text-center">Aucune catégorie trouvée pour cette blockchain.</p>
        )
      }
    </main>
  );
}
