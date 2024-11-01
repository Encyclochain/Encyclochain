import { Header } from '@/components/Header';
import SectionContent from '@/components/Section/SectionContent';
import Carousel_ImgTop from '@/components/Carousel/CarouselImgTop';
import CategoryTitles from '@/components/Section/CategoryTitles';
import SectionInfo from '@/components/Section/SectionInformation';
import prisma from '@/lib/db';

interface PageProps {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}



async function getBlockchainData(page: string) {
  const chapters = await prisma.chapter.findMany({
    where: {
      section: {
        title: page,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

  const sectionInfo = await prisma.sectionInfo.findFirst({
    where: {
      section: {
        title: {
          equals: page,
        },
      },
    },
    select: {
      color: true, // Récupère la couleur
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
          link: true,
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

  return { sectionInfo, prisma_res, chapters };
}

export default async function Page({ params, searchParams }: PageProps) {
  const page = decodeURIComponent(params.page);
  const { sectionInfo, prisma_res, chapters } = await getBlockchainData(page);
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
        pageTitle={page} 
      />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%]">
          <SectionContent page={page} chapters={chapters} />
        </div>
        {/* Le composant SectionInfo fait maintenant son propre appel Prisma */}
        <SectionInfo page={page} />
      </div>
      <CategoryTitles categories={filteredCategories} />
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
