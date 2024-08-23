import { Social } from "../Social";

export function Banner() {
  return (
    <div className="bg-[#F7931A] flex h-[54vh] justify-center items-center flex-col">
      <h1 className="text-white text-[104px] font-semibold max-md:text-[80px]">
        ₿ITCOIN
      </h1>
      <Social design="flex gap-[30px] max-md:w-full max-lg:flex max-lg:justify-center" />
      <a
        href="https://bitcoin.org/bitcoin.pdf"
        className="bg-white text-[#F7931A] px-6 py-3 rounded-sm font-medium mt-[20px]"
      >
        Whitepaper
      </a>
    </div>
  );
}
