import { PreviewData } from '@/type';
import { extractMetaTags } from '@/lib/extractMeta';
import LinkPreview from '../Section/LinkPreview';

interface ResourceTableProps {
  resources: Array<any>;
  color: string;
}

export default async function ResourceTable({ resources, color }: ResourceTableProps) {
  // Utiliser Promise.allSettled pour gérer les erreurs individuellement
  const results = await Promise.allSettled(
    resources.map(async (res) => {
      let formatData: PreviewData = {
        title: 'No title',
        description: 'No description',
        image: 'nopic',
        url: '',
        id: '',
      };

      try {
        const data = await extractMetaTags(res.link);
        if (!data) return null;

        formatData = {
          title: data.title || 'No title',
          description: data.description || 'No description',
          image: data.image || 'nopic',
          url: res.link,
          id: res.id || res.link,
        };
      } catch (e) {
        console.error('Resource Table error:', e);
      }

      return formatData;
    })
  );

  // Filtrer uniquement les promesses résolues avec des données valides
  const formattedDataList = results
    .filter((result) => result.status === 'fulfilled' && result.value !== null)
    .map((result) => (result as PromiseFulfilledResult<PreviewData>).value);

  return (
    <div className="w-[100%] max-sm:w-[70%]">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 list-none p-0">
        {formattedDataList.map((formatData) => (
          <li key={formatData.id} className="font-poppins">
            <LinkPreview data={formatData} color={color} />
          </li>
        ))}
      </ul>
    </div>
  );
}
