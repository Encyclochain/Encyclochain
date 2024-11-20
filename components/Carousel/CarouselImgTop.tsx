import { PreviewData } from '@/type';
import { extractMetaTags } from '@/lib/extractMeta';
import CarouselContent from './CarouselContent';

interface ResourceTableProps {
  resources: Array<any>;
  color: string;
}

export default async function ResourceTable({ resources, color }: ResourceTableProps) {
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

  const formattedDataList = results
    .filter((result) => result.status === 'fulfilled' && result.value !== null)
    .map((result) => (result as PromiseFulfilledResult<PreviewData>).value);

  return <CarouselContent formattedDataList={formattedDataList} color={color} />;
}
