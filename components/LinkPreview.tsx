import { Card, CardContent } from "@/components/ui/card";
//import Image from "next/image";

import { extractMetaTags } from "@/lib/extractMeta";

export async function LinkPreview({ url }: { url: string }) {
    const data = await extractMetaTags(url);

    //console.log("Voivi la data : ");
    //console.log(data);

    if (!data) {
        return <p>Failed to fetch link preview.</p>;
    }
    return (
        <div className="h-[100%]">
            <Card className=" w-[100%] h-[100%]">
                <CardContent className="flex items-center justify-center w-[100%] h-[100%]">
                    <a href={url} className=" w-[100%] h-[100%] flex flex-col gap-7">
                        <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '37.21%' }}>
                            <img src={data.image} alt={data.title} layout="cover " width={645} height={240} style={{ objectFit: 'cover' }} className="w-[100%]" />
                        </div>
                        <div className="px-3 pb-3">
                            <h3 className='font-semibold pb-2'>{data.title}</h3>
                            <p>{data.description}</p>
                        </div>
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}