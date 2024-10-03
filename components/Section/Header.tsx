import { Social } from "../Social"; // Importing the Social component for social media icons

// Header component definition with a prop for custom styling (design)
export function Header({ design }: { design: string }) {
  return (
    // The outer div uses the 'design' prop for dynamic styling, allowing the parent component to control the layout
    <div className={design}>
      
      {/* The main heading of the header, with responsive styling */}
      <p className="font-garamond text-gray-900 font-serif text-3xl w-full text-center font-medium normal-case not-italic no-underline leading-tight tracking-tighter max-lg:hidden">
        Blockchains encyclopedia
      {/* This is a fixed heading, and it becomes hidden on smaller screens due to 'max-lg:hidden' */}
      </p>

      {/* Rendering the Social component, which displays social media icons with responsive design */}
      <Social design="flex gap-[15px] max-md:w-full max-lg:flex max-lg:justify-center" />
      {/* Social component styling:
          - 'flex' ensures that social icons are laid out in a row
          - 'gap-[15px]' provides spacing between icons
          - 'max-md:w-full' makes sure that, on smaller screens (below 'md'), the icons take up the full width
          - 'max-lg:flex max-lg:justify-center' ensures that on medium-sized screens, the icons are centered
      */}
    </div>
  );
}
