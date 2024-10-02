import { Social } from "./Social"; // Importing the Social component to display social media icons
import Link from "next/link"; // Importing Link component from Next.js for client-side navigation
import { CircleArrowLeft } from "lucide-react"; // Importing an icon from lucide-react

// Header component with dynamic styling (design) and optional back arrow (showArrow)
export function Header({
  design, // Custom design/styles passed as a string for the container
  showArrow = false, // Optional prop to show a back arrow, defaults to false
}: {
  design: string; // Type for design is a string
  showArrow?: boolean; // showArrow is optional and defaults to false
}) {
  return (
    // Apply dynamic styles using the design prop
    <div className={design}>
      
      {/* Link to homepage, with optional back arrow if showArrow is true */}
      <Link href="/">
        {/* Conditional rendering for the back arrow icon, shown only if showArrow is true */}
        <span className="flex items-center font-garamond text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter max-lg:text-center">
          {showArrow && (
            <CircleArrowLeft className="mr-2 text-white bg-black rounded-full" />
          )} {/* Adds an arrow icon with some styling if showArrow is true */}
        </span>
      </Link>

      {/* Title displayed in the center of the header, hidden on small screens */}
      <p className="font-garamond text-gray-900 font-serif text-3xl w-full text-center font-medium normal-case not-italic no-underline leading-tight tracking-tighter max-lg:hidden">
        Blockchains encyclopedia
      </p>

      {/* Social media icons section using the Social component */}
      <Social design="flex gap-[15px] max-md:w-full max-lg:flex max-lg:justify-center" />
    </div>
  );
}
