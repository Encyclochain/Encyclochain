import { Social } from "../Social";
interface BannerProps {
  color: string;  // Prop pour la couleur dynamique
  title: string;
  whitepaperLink: string;
}

export function Banner({ color, title, whitepaperLink }: BannerProps) {
  return (
    <div className="flex h-[54vh] justify-center items-center flex-col" style={{ backgroundColor: color }}>
      <h1 className="text-white text-[104px] font-semibold font-garamond max-md:text-[80px]">
        {title}
      </h1>
      <Social design="flex gap-[30px] max-md:w-full max-lg:flex max-lg:justify-center" />
      <a
        href={whitepaperLink} target="_blank"
        className="bg-white px-6 py-3 rounded-sm font-medium mt-[20px]" style={{ color: color }} 
      >
        Whitepaper
      </a>
    </div>
  );
}
