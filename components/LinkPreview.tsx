import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

//Component to display the link preview data
//data is passed by Carousel component

//interface containing needed data
export interface PreviewData {
    title: string,
    description: string,
    image: string,
    url: string,
};

//preview data is passed as a PreviewData object
export function LinkPreview({ data }: { data: PreviewData }) {

    //use default image if data is empty (NOT WORKING)
    const imageSrc = data.image === "nopic" ? "assets/articles/bitcoinmagazine.png" : data.image;
    //console.log("Image source : ", imageSrc);

    //design copied from CarouselCategoryX
    return (
        <div className="h-[100%]">
            <Card className=" w-[100%] h-[100%] border-none">
                <CardContent className="flex items-center justify-center w-[100%] h-[100%] md:h-[350px]">
                    <a
                        href={data.url}
                        className=" w-[100%] flex flex-col gap-4"
                    >
                        <img
                            src={imageSrc}
                            alt={data.title}
                            style={{ objectFit: 'cover' }}
                            className="w-[100%]"
                        />
                        <div className="px-3 pb-3">
                            <h3 className='font-semibold pb-2'>{data.title}</h3>
                            <p>{data.description}</p>
                        </div>
                        <Button className="bg-[#F7931A] hover:bg-[#F7931A] rounded-none w-max p-[20px] max-md:w-full max-md:rounded-[5px] top-5">
                            Explore
                        </Button>
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}