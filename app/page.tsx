"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { ConnectButton } from "@/components/wallet/ConnectButton";
import { useAccount } from "wagmi";

import Bitcoin from "../assets/Icone/Bitcoin.svg";
import Eth from "../assets/Icone/eth.svg";
import Avalanche from "../assets/Icone/Avalanche.svg";
import Solana from "../assets/Icone/Solana.png";
import mail from "../assets/Social/mail.svg";

import { AccordionHeader } from "../components/Accordion";
import { Social } from "@/components/Social";
import { Header } from "@/components/Header";
import CryptoWidget from "../components/CryptoWidget";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <main className="flex  flex-col items-center">
      <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm flex" />
      <div className="w-full p-[20px] lg:hidden">
        <AccordionHeader />
      </div>

      <ConnectButton />
      {isConnected && (
        <Button className="bg-[#627EEA] hover:bg-[#627EEA]  rounded-sm">
          Explore
        </Button>
      )}
      <div className=" w-full  flex flex gap-[150px] pt-[5%] pb-0 pl-[5%] pr-[5%] max-lg:hidden">
        <div className="flex flex-col gap-[25px] ">
          <h2 className="font-garamond text-[18px] font-semibold ">What?</h2>
          <p className="w-full max-w-[520px] text-gray-800 font-sans font-poppins text-base font-light normal-case not-italic no-underline leading-normal tracking-normal">
            Blockchains encyclopedia that regroup ressources for every
            blockchains and other field in the future. Beginner, confirmed,
            developer and more you will find your need.
          </p>
        </div>
        <div className="flex flex-col gap-[25px]">
          <h2 className="font-garamond text-[18px] font-semibold ">How?</h2>
          <p className="w-full max-w-[420px] text-gray-800 font-sans font-poppins text-base font-light normal-case not-italic no-underline leading-normal tracking-normal">
            Every chains will have a dedicated page where you will be able to
            find ressources filtered by field or level. Permissionless
            contribution is planned.
          </p>
        </div>
        <div className="flex flex-col gap-[25px]">
          <h2 className="font-garamond text-[18px] font-semibold ">
            Contribute?
          </h2>
          <ul className="list-disc pl-[40px]">
            <li className="w-full max-w-[493px] text-gray-900 font-sans text-base font-light font-poppins normal-case not-italic no-underline leading-relaxed tracking-normal">
              <a
                href="#donation"
                className="text-red-500 mr-[5px] font-poppins"
              >
                Donation
              </a>
              to help our initiative to grow
            </li>
            <li className="w-full max-w-[493px] text-gray-900 font-sans text-base font-poppins font-light normal-case not-italic no-underline leading-relaxed tracking-normal">
              Suggestions and ressources on telegram
            </li>
          </ul>
        </div>
      </div>
      <p className="text-gray-900 font-serif text-3xl font-medium normal-case not-italic no-underline  mt-[20px] leading-tight tracking-tighter lg:hidden">
        Blockchains encyclopedia
      </p>
      <div className="mt-[5%] mb-[5%] flex w-full justify-between p-[50px] max-md:flex-wrap">
        <div className="flex flex-col items-center gap-[20px] w-[25%] max-md:w-[40%] mb-[20px]">
          <Image
            src={Bitcoin}
            alt="Bitcoin Logo"
            className="dark:invert"
            width={185}
            height={24}
            priority
          />
          <Button className="bg-[#F7931A] hover:bg-[#F7931A] rounded-sm">
            <Link href="/blockchains">Explore</Link>
          </Button>
        </div>
        <div className="flex flex-col items-center gap-[20px] w-[25%] max-md:w-[40%]">
          <Image
            src={Eth}
            alt="Eth Logo"
            className="dark:invert"
            width={185}
            height={24}
            priority
          />
          <Button className="bg-[#627EEA] hover:bg-[#627EEA]  rounded-sm">
            Explore
          </Button>
        </div>
        <div className="flex flex-col items-center gap-[20px] w-[25%] max-md:w-[40%]">
          <Image
            src={Solana}
            alt="Solana Logo"
            className="dark:invert"
            width={185}
            height={24}
            priority
          />
          <Button className="bg-[#000000] hover:bg-[#000000] rounded-sm">
            Explore
          </Button>
        </div>
        <div className="flex flex-col items-center gap-[20px] w-[25%] max-md:w-[40%]">
          <Image
            src={Avalanche}
            alt="Avalanche Logo"
            className="dark:invert"
            width={185}
            height={24}
            priority
          />
          <Button className="bg-[#E84142] hover:bg-[#E84142] rounded-sm">
            Explore
          </Button>
        </div>
      </div>
    </main>
  );
}
