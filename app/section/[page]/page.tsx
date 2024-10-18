// Page.tsx
import { Header } from '@/components/Header';
import SectionContent from '@/components/SectionContent';
import Carousel_ImgTop from '@/components/Carousel/CarouselImgTop';
import CategoryTitles from '@/components/CategoryTitles';
import prisma from '@/lib/db';

interface PageProps {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getBlockchainData(page: string) {
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

export default async function Page({ params, searchParams }: PageProps) {
  const page = decodeURIComponent(params.page);
  const { sectionInfo, prisma_res } = await getBlockchainData(page);
  const sectionColor = sectionInfo?.color || '#F7931A';

  const selectedCategoriesParam = searchParams.categoryIds;
  const selectedCategoryIds = selectedCategoriesParam
    ? (selectedCategoriesParam as string).split(',').map((id) => parseInt(id))
    : [];

  const categories = prisma_res;

  const filteredCategories =
    selectedCategoryIds.length > 0
      ? categories.filter((cat) => selectedCategoryIds.includes(cat.id))
      : categories;

  return (
    <main className="container mx-auto px-4 py-8">
      <Header
        design="z-10 w-full items-center p-5 justify-between font-mono text-sm flex mb-8"
        showArrow={true}
      />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%]">
          <SectionContent page={page} />
        </div>
        <aside className="w-full lg:w-[30%] bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Informations générales</h2>
          <ul className="space-y-2">
            <li><strong>Date de création</strong> : 3 janvier 2009</li>
            <li><strong>Créateur</strong> : Satoshi Nakamoto</li>
            <li><strong>Symbole boursier</strong> : BTC, XBTn1 ฿</li>
            <li><strong>Sous-unité</strong> : 1/100 000 000 satoshi</li>
          </ul>
          <h3 className="text-lg font-semibold mt-6 mb-2">Caractéristiques de la chaîne</h3>
          <ul className="space-y-2">
            <li><strong>Type de minage</strong> : Preuve de travail</li>
            <li><strong>Fonction de hachage</strong> : SHA-256</li>
            <li><strong>Fréquence moyenne des blocs</strong> : 10 min</li>
            <li>
              <strong>Récompense par blocs</strong> : 3,125 BTC depuis le 20 avril 2024, jusqu'au bloc numéro 1 050 000 (2028), puis division par 2 tous les 210 000 blocs (environ tous les 4 ans)
            </li>
            <li><strong>Quantité maximale</strong> : 20 999 999,976 9</li>
            <li><strong>Taille des blocs</strong> : Variable mais majorée par 4 Mo</li>
          </ul>
        </aside>
      </div>
      <CategoryTitles categories={categories} />
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat) =>
          cat.resources.length > 0 ? (
            <div key={cat.id} className="mt-12">
              <h2 className="text-2xl font-bold mb-4">{cat.title}</h2>
              <Carousel_ImgTop resources={cat.resources} color={sectionColor} />
            </div>
          ) : null
        )
      ) : (
        <p className="text-center mt-12">Aucune catégorie trouvée pour cette blockchain.</p>
      )}
    </main>
  );
}
