import { Header } from '@/components/Header';
import SectionContent from '@/components/Section/SectionContent';
import Carousel_ImgTop from '@/components/Carousel/CarouselImgTop';
import CategoryTitles from '@/components/Section/CategoryTitles';
import SectionInfo from '@/components/Section/SectionInformation';
import prisma from '@/lib/db';
import { Button } from "@/components/ui/button";
import SubmitResourceModal from '@/components/Contribution/SubmitResourceModal';

interface PageProps {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

interface Resource {
  id: number;
  link: string;
  typeId: number;
}

interface Category {
  id: number;
  title: string;
  resources: Resource[];
}

interface SectionInfo {
  color: string;
}

interface Chapter {
  id: number;
  title: string;
  description: string;
}

async function getBlockchainData(page: string) {
  const sectionData = await prisma.section.findFirst({
    where: { title: page },
    select: {
      title: true,
      chapters: { select: { id: true, title: true, description: true } },
      sectionInfo: { select: { color: true } },
      categories: {
        select: {
          id: true,
          title: true,
          resources: {
            where: { sections: { some: { title: page } } }, // Filtre ici
            select: {
              id: true,
              link: true,
              typeId: true,
            },
          },
        },
      },
    },
  });

  return {
    chapters: sectionData?.chapters || [],
    sectionInfo: sectionData?.sectionInfo || null,
    categories: sectionData?.categories || [],
  };
}


export default async function Page({ params, searchParams }: PageProps) {
  // Décodage de `params.page` sans `await`
  const page = decodeURIComponent(params.page);

  // Récupération des données blockchain
  const { chapters, sectionInfo, categories } = await getBlockchainData(page);
  const sectionColor = sectionInfo?.color || '#F7931A';

  // Gestion des catégories sélectionnées sans `await`
  const selectedCategoriesParam = searchParams.categoryIds;
  const selectedCategoryIds = selectedCategoriesParam
    ? (selectedCategoriesParam as string).split(',').map((id) => parseInt(id))
    : [];

  // Filtrage des catégories selon la sélection
  const filteredCategories: Category[] =
    selectedCategoryIds.length > 0
      ? categories.filter((cat: Category) => selectedCategoryIds.includes(cat.id))
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
        <SectionInfo page={page} />
      </div>
      <CategoryTitles categories={filteredCategories} />
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat: Category) =>
          cat.resources.length > 0 ? (
            <div key={cat.id} className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{cat.title}</h2>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm font-medium">
                    {cat.resources.length} resources
                  </span>
                </div>
                <SubmitResourceModal
                  categoryId={cat.id}
                  categoryTitle={cat.title}
                  sectionTitle={page}
                />
              </div>
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
