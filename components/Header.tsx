import { Social } from "./Social";

export function Header({ design }: { design: string }) {
  return (
    <div className={design}>
      <p className="font-garamond text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter max-lg:text-center">
        Encyclochain
      </p>
      <p className=" font-garamond text-gray-900 font-serif text-3xl w-full text-center font-medium normal-case not-italic no-underline leading-tight tracking-tighter max-lg:hidden">
        Blockchains encyclopedia
      </p>
      <Social design="flex gap-[15px] max-md:w-full max-lg:flex max-lg:justify-center" />
    </div>
  );
}
