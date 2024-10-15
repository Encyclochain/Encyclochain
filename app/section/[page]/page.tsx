// app/[page]/page.tsx
import prisma from '@/lib/db';
import { Header } from '@/components/Header';
import { Banner } from '@/components/Section/Banner';
import Carousel_ImgTop from '@/components/Carousel/CarouselImgTop'; // Assurez-vous que le chemin est correct

interface PageProps {
  params: { page: string };
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
      websiteLink: true,
    },
  });

  // Récupérer les catégories et leurs ressources liées à la blockchain spécifique
  const prisma_res = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      resources: {
        where: {
          sections: {
            some: {
              title: {
                equals: page,
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
            equals: page,
          },
        },
      },
    },
  });

  return { sectionInfo, prisma_res };
}

export default async function Page({ params }: PageProps) {
  const page = decodeURIComponent(params.page);

  // Appelle la fonction pour obtenir les données de la blockchain
  const { sectionInfo, prisma_res } = await getBlockchainData(page);

  // Définir la couleur par défaut si aucune couleur n'est trouvée
  const sectionColor = sectionInfo?.color || '#F7931A';
  const whitepaperLink = sectionInfo?.whitepaperLink || 'https://bitcoin.org/bitcoin.pdf';

  return (
    <main>
      <Header
        design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm flex"
        showArrow={true}
      />
      <Banner color={sectionColor} title={page} whitepaperLink={whitepaperLink} />
      {prisma_res.length > 0 ? (
        prisma_res.map((cat) =>
          cat.resources.length > 0 ? (
            <div key={cat.id} className="flex items-center mt-[30px]">
              <div className="flex justify-center items-center my-8 mb-[12%] flex-col w-full h-[500px]">
                <h2 className="w-[74%] font-bold text-3xl pb-[30px] mr-[20px] font-garamond">
                  {cat.title}
                </h2>
                <Carousel_ImgTop resources={cat.resources} color={sectionColor} />
              </div>
            </div>
          ) : null
        )
      ) : (
        <p className="text-center">Aucune catégorie trouvée pour cette blockchain.</p>
      )}
    </main>
  );
}
