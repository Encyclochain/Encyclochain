import { Social } from "../Social"; // Importing the Social component

// Interface to type the props for the Banner component
interface BannerProps {
  color: string;  // Dynamic background color for the banner
  title: string;  // Title text for the banner
  whitepaperLink: string;  // Link to the whitepaper
}

// Banner component definition
export function Banner({ color, title, whitepaperLink }: BannerProps) {
  return (
    // Flex container for the banner, with dynamic background color
    <div
      className="flex h-[54vh] justify-center items-center flex-col"
      style={{ backgroundColor: color }} // Inline style to set dynamic background color
    >
      {/* Title text with responsive font size */}
      <h1 className="text-white text-[104px] font-semibold font-garamond max-md:text-[80px]">
        {title} {/* Displays the dynamic title */}
      </h1>

      {/* Social component rendering social media icons with responsive design */}
      <Social design="flex gap-[30px] max-md:w-full max-lg:flex max-lg:justify-center" />

      {/* Link to the whitepaper, styled as a button with dynamic text color */}
      <a
        href={whitepaperLink} // Link to the whitepaper
        target="_blank" // Opens the link in a new tab
        className="bg-white px-6 py-3 rounded-sm font-medium mt-[20px]" // Button styling
        style={{ color: color }} // Dynamic text color based on the background color
      >
        Whitepaper {/* Button text */}
      </a>
    </div>
  );
}
