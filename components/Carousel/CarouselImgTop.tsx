import { PreviewData } from '@/type';
import { extractMetaTags } from '@/lib/extractMeta';
import LinkPreview from '../Section/LinkPreview';

interface ResourceTableProps {
  resources: Array<any>;
  color: string;
}

export default async function ResourceTable({ resources, color }: ResourceTableProps) {
  const formattedDataList: PreviewData[] = [];

  await Promise.all(
    resources.map(async (res) => {
      let data = null;

      let formatData: PreviewData = {
        title: 'No title',
        description: 'No description',
        image: 'nopic',
        url: '',
        id: '',
      };

      try {
        data = await extractMetaTags(res.link);
        if (!data) {
          return;
        }

        formatData.title = data.title || 'No title';
        formatData.description = data.description || 'No description';
        formatData.image = data.image || 'nopic';
        formatData.url = res.link;
        formatData.id = res.id || res.link;

        formattedDataList.push(formatData);
      } catch (e) {
        console.error('Resource Table error : ', e);
      }
    })
  );

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