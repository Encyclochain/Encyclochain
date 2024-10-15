// components/Carousel/Carousel_ImgTop.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';

import LinkPreview from '../Section/LinkPreview';
import { PreviewData } from '@/types';
import { extractMetaTags } from '@/lib/extractMeta';

interface Carousel_ImgTopProps {
  resources: Array<any>;
  color: string;
}

export default async function Carousel_ImgTop({ resources, color }: Carousel_ImgTopProps) {
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
        console.error('Carousel error : ', e);
      }
    })
  );

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-[80%] max-sm:w-[90%]"
    >
      <CarouselContent className="gap-[8%] max-sm:pl-0">
        {formattedDataList.map((formatData) => (
          <CarouselItem
            key={formatData.id}
            className="lg:basis-1/2 xl:basis-1/3 h-[100%] pr-[5%] flex items-center font-poppins"
          >
            <LinkPreview data={formatData} color={color} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
