"use client"

import { useState } from "react"; // Importing the useState hook for managing the bookmarked state
import { Card, CardContent } from "@/components/ui/Card"; // Importing UI components for the card layout
import { Badge } from "@/components/ui/Badge"; // Importing the Badge component for displaying categories/tags
import star from "@/assets/Icone/Star.svg"; // Importing the star icon for rating
import { RxExternalLink } from "react-icons/rx"; // Importing the external link icon
import { VscBookmark } from "react-icons/vsc"; // Importing an unfilled bookmark icon
import { PiBookmarkSimpleFill } from "react-icons/pi"; // Importing a filled bookmark icon
import Image from "next/image"; // Importing Image from Next.js for optimized image handling

// Defining the structure for the data that will be passed into the component
export interface PreviewData {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

// LinkPreview component definition
export function LinkPreview({
  data,  // The preview data containing title, description, image, etc.
  color, // The dynamic color used in styling
}: {
  data: PreviewData;
  color: string;
}) {
  // State to track whether the item is bookmarked or not
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Fallback image logic: if the image is "nopic", use a default image
  const imageSrc = data.image === "nopic" ? "assets/articles/bitcoinmagazine.png" : data.image;

  return (
    // Wrapper div with full height and width
    <div className="h-[100%] w-[100%]">
      {/* Card component to hold the content with a fixed height */}
      <Card className="w-[100%] h-[500px] relative">
        {/* CardContent that contains the main preview content */}
        <CardContent className="relative flex items-center w-[100%] h-[404px] md:h-[350px]">
          {/* Link wrapping the entire card content to make the whole area clickable */}
          <a
            href={data.url}
            className="w-[100%] flex flex-col h-[500px] justify-between mt-[150px] max-md:mt-[90px]"
            target="blank"
          >
            {/* Image section displaying the preview image */}
            <img
              src={imageSrc}
              alt={data.title}
              style={{ objectFit: "cover" }}
              className="w-[100%] h-[226px]"
            />

            {/* Section displaying the title, badge, description, and metadata */}
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2 mb-[10px]">
                <Badge variant="secondary">Blockchain</Badge> {/* Badge indicating the category */}
                <p className="text-sm">5 min read</p> {/* Additional metadata (e.g., read time) */}
              </div>
              
              {/* Displaying the title and description */}
              <h3 className="font-semibold pb-2">{data.title}</h3>
              <p>{data.description}</p>
            </div>

            {/* Section displaying the star rating (5 stars) */}
            <div className="flex ml-[10px]">
              {/* Repeating star icons */}
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
            </div>

            {/* Section with author and date information */}
            <div className="flex flex-col w-full pr-[20px] ml-[10px]">
              <div className="flex justify-start gap-[10px]">
                <p>Author: John Doe</p> {/* Static author name */}
                <p>Date: Oct 1, 2023</p> {/* Static publication date */}
              </div>

              {/* External link icon */}
              <div className="flex justify-end pb-[10px] w-[100%]">
                <RxExternalLink width={24} height={24} />
              </div>
            </div>
          </a>

          {/* Bookmark button to toggle bookmark state */}
          <button
            className="absolute top-[240px] right-3 cursor-pointer z-10"
            onClick={(e) => {
              e.preventDefault(); // Prevent the link from being followed when clicking the button
              setIsBookmarked(!isBookmarked); // Toggle the bookmark state
            }}
          >
            {/* Conditional rendering of the bookmark icon based on whether the item is bookmarked */}
            {isBookmarked ? (
              <PiBookmarkSimpleFill size={24} /> // Filled bookmark icon if bookmarked
            ) : (
              <VscBookmark size={24} /> // Outline bookmark icon if not bookmarked
            )}
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
