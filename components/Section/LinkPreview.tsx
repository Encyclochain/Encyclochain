"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge"
import star from "../assets/Icone/Star.svg"
import { RxExternalLink } from "react-icons/rx";
import { VscBookmark } from "react-icons/vsc";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import Image from "next/image";

export interface PreviewData {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

export function LinkPreview({
  data,
  color,
}: {
  data: PreviewData;
  color: string;

}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const imageSrc = data.image === "nopic" ? "assets/articles/bitcoinmagazine.png" : data.image;

  return (
    <div className="h-[100%] w-[100%]">
      <Card className="w-[100%] h-[500px] relative">
        <CardContent className="relative flex items-center w-[100%] h-[404px] md:h-[350px]">
          <a
            href={data.url}
            className="w-[100%] flex flex-col h-[500px] justify-between mt-[150px] max-md:mt-[90px]"
            target="blank"
          >
            <img
              src={imageSrc}
              alt={data.title}
              style={{ objectFit: "cover" }}
              className="w-[100%] h-[226px]"
            />
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2 mb-[10px]">
                <Badge variant="secondary" >Blockchain</Badge>
                <p className="text-sm ">5 min read</p>
              </div>
              <h3 className="font-semibold pb-2">{data.title}</h3>
              <p>{data.description}</p>
            </div>
            <div className="flex ml-[10px]">
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
            </div>
            <div className="flex flex-col w-full pr-[20px] ml-[10px]">
              <div className="flex justify-start gap-[10px]">
                <p>Author: John Doe</p>
                <p>Date: Oct 1, 2023</p>
              </div>
              <div className="flex justify-end pb-[10px] w-[100%]">
                <RxExternalLink width={24} height={24} />
              </div>
            </div>
          </a>
          <button
            className="absolute top-[240px] right-3 cursor-pointer z-10"
            onClick={(e) => {
              e.preventDefault();
              setIsBookmarked(!isBookmarked);
            }}
          >
            {isBookmarked ? (
              <PiBookmarkSimpleFill size={24} />
            ) : (
              <VscBookmark size={24} />
            )}
          </button>
        </CardContent>
      </Card>
    </div>
  );
}