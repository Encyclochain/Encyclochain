import { Social } from "./Social";
import Link from "next/link";
import { CircleArrowLeft } from "lucide-react";

export function Header({
  design,
  showArrow = false, // Ajoutez cette prop avec une valeur par défaut de false
}: {
  design: string;
  showArrow?: boolean;
}) {
  return (
    <div className={design}>
      <Link href="/">
        <span className="flex items-center font-garamond text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter max-lg:text-center">
          {showArrow && <CircleArrowLeft className="mr-2 text-white bg-black rounded-full"/>} {/* Affiche la flèche si showArrow est vrai */}
          Encyclochain
        </span>
      </Link>
      <p className="font-garamond text-gray-900 font-serif text-3xl w-full text-center font-medium normal-case not-italic no-underline leading-tight tracking-tighter max-lg:hidden">
        Blockchains encyclopedia
      </p>
      <Social design="flex gap-[15px] max-md:w-full max-lg:flex max-lg:justify-center" />
    </div>
  );
}

