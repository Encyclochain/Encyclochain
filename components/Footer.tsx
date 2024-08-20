import Image from "next/image";
import { AccordionDonation } from "./Accordion";
import { Social } from "./Social";
import twitter from "../assets/Social/twitter.svg";
import discord from "../assets/Social/Discord.svg";
import mail from "../assets/Social/mail.svg";
import EC from "@/assets/Icone/EC.png";

export function Footer() {
  return (
    <footer className="flex w-full justify-between gap-[30px] max-md:flex-col">
      <div className="px-5 py-4 flex flex-col gap-[30px] w-full flex-1 min-h-[200px]">
        <div className="max-md:w-full max-md:flex max-md:justify-center">
          <Image
            src={EC}
            alt="Encyclochain Logo"
            className="dark:invert"
            width={80}
            height={24}
            priority
          />
        </div>
        <p className="m-0 max-md:w-full max-md:text-center font-poppins">
          Blockchains encyclopedia that regroup ressources for every blockchains
          and other field in the future. Beginner, confirmed, developer and more
          you will find your need.
        </p>
        <Social design="flex gap-[15px] mt-[20px] max-md:w-full max-md:flex max-md:justify-center" />
      </div>

      <div className="group rounded-lg px-5 py-4 transition-colors flex-1 min-h-[200px]">
        <h2
          id="donation"
          className="mb-3 text-2xl font-garamond font-semibold text-center"
        >
          Donation
        </h2>
        <AccordionDonation />
      </div>

      <div className="group rounded-lg px-5 py-4 flex flex-col gap-[30px] flex-1 min-h-[200px]">
        <h2 className="mb-3 text-2xl font-garamond font-semibold text-center">
          Contact
        </h2>
        <p className="m-0 max-md:w-full max-md:text-center font-poppins">
          You have 3 options to contact us twitter, telegram or e-mail. The
          fastest one will be on telegram or twitter
        </p>
        <ul className="flex flex-col">
          <li className="flex gap-[10px]">
            <Image
              src={twitter}
              alt="Twitter Logo"
              className="dark:invert"
              width={13}
              height={24}
              priority
            />
            <a href="https://x.com/Encyclochain" target="_blank">
              Encyclochain
            </a>
          </li>
          <li className="flex gap-[10px]">
            <Image
              src={discord}
              alt="Discord Logo"
              className="dark:invert"
              width={13}
              height={24}
              priority
            />
            Encyclochain
          </li>
          <li className="flex gap-[10px]">
            <Image
              src={mail}
              alt="Mail Logo"
              className="dark:invert"
              width={13}
              height={24}
              priority
            />
            encyclochain@gmail.com
          </li>
        </ul>
      </div>
    </footer>
  );
}
