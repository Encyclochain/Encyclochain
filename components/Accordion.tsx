import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function AccordionDonation() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-garamond text-[16px] flex justify-end items-center flex-row-reverse gap-[5px]">
          Donate
        </AccordionTrigger>
        <AccordionContent className="text-[16px] ">BTC</AccordionContent>
        <AccordionContent className="text-[#f7931a] text-[16px]">
          bc1p0ncd73hmrw22lff8x72clxzv2dphqvpz207885p4k4ur6aawgw5sglcaw9
        </AccordionContent>
        <AccordionContent className="text-[16px]">ETH</AccordionContent>
        <AccordionContent className="text-[#627eea] text-[16px]">
          0xaCddA09A4EF4dd01a0b145eb5a643D49C393D151
        </AccordionContent>
        <AccordionContent className="text-[16px]">SOL</AccordionContent>
        <AccordionContent className="text-[16px]">
          AKMTtiPwJbmTwRNCJpHt3h2GdZ3ikBc2AcRCfFk3My7m
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-garamond text-[16px] flex justify-end items-center flex-row-reverse gap-[5px]">
          Use of donation
        </AccordionTrigger>
        <AccordionContent className="text-[16px]">
          <p className="mb-[14px] font-poppins">
            Donation will be used as follow
          </p>
          <ul className="pl-[40px] list-disc font-poppins ">
            <li>Cover the worker cost</li>
            <li>Cover cost to run Encyclochain</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-garamond text-[16px] flex justify-end items-center flex-row-reverse gap-[5px]">
          Why donate ?
        </AccordionTrigger>
        <AccordionContent className="text-[16px] font-poppins">
          Encyclochain is a public good that have no revenue at the moment, only
          supported by donation and everything is free. Encyclochain will become
          open source and permissionless in the futur.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionHeader() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What?</AccordionTrigger>
        <AccordionContent className="text-[16px]">
          Blockchains encyclopedia that regroup ressources for every blockchains
          and other field in the future. Beginner, confirmed, developer and more
          you will find your need.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How?</AccordionTrigger>
        <AccordionContent className="text-[16px]">
          Every chains will have a dedicated page where you will be able to find
          ressources filtered by field or level. Permissionless contribution is
          planned.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Contribute?</AccordionTrigger>
        <AccordionContent>
          <p>At the moment you can contribute in 2 ways:</p>
          <ul className="list-disc pl-[40px]">
            <li className="w-full max-w-[493px] text-gray-900 font-sans text-base font-light normal-case not-italic no-underline leading-relaxed tracking-normal">
              <a href="#donation" className="text-red-500 mr-[5px]">
                Donation
              </a>
              to help our initiative to grow
            </li>
            <li className="w-full max-w-[493px] text-gray-900 font-sans text-base font-light normal-case not-italic no-underline leading-relaxed tracking-normal">
              Suggestions and ressources on telegram
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}