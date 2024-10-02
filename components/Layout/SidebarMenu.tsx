"use client";

import { useState } from "react";

import Link from "next/link";
import { AiOutlineSearch, AiOutlineHome, AiOutlineFolder, AiOutlineEye, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { Button } from "../ui/Button";

// Typage des sections reçues en props
interface SectionType {
  id: number;
  title: string;
}

interface SidebarMenuProps {
  sectionTypes: SectionType[]; // Données passées via props depuis le composant serveur
}

function SidebarMenu({ sectionTypes }: SidebarMenuProps) {
  const [isOpen, setIsOpen] = useState(true); // Hook pour l'ouverture du menu

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-[#111213] h-screen p-4 flex flex-col justify-between transition-width duration-300 ease-in-out z-50`}
      >
        <p className="font-garamond text-white font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter text-center">
          {isOpen ? "Encyclochain" : "EC"}
        </p>
        <div className="flex items-center justify-center bg-white mt-[10px] gap-[10px] br-[40px] p-[4px] rounded-[8px] border-solid border-2 border-[#8f96a3] outline-none">
          <AiOutlineSearch className="text-black" size={24} />
          {isOpen && (
            <input type="text" className="bg-transparent outline-none" placeholder="Search..." />
          )}
        </div>

        <nav className="flex-grow relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-white focus:outline-none bg-[#111213] rounded-r-full p-2"
          >
            {isOpen ? <AiOutlineLeft size={24} /> : <AiOutlineRight size={24} />}
          </button>
          <ul className="mt-4 space-y-4 mb-[20px]">
            <div className="border-b pb-[10px]">
              {isOpen && <p className="text-white">Your profile</p>}
            </div>
            <li>
              <Link href="/" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                <span className="flex items-center">
                  <AiOutlineHome size={24} />
                  {isOpen && <span className="ml-2">Home</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/watchlist" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                <span className="flex items-center">
                  <AiOutlineEye size={24} />
                  {isOpen && <span className="ml-2">Watchlist</span>}
                </span>
              </Link>
            </li>

            <div className="border-b pb-[10px]">{isOpen && <p className="text-white">Sections</p>}</div>

            {/* Affichage des sectionTypes passés en props */}
            <div className="overflow-y-auto max-h-[400px]">
              {sectionTypes.length === 0 ? (
                <p className="text-white">No sections available</p>
              ) : (
                sectionTypes.map((sectionType) => (
                  <li key={sectionType.id}>
                    <Link
                      href={`/topic/${sectionType.title}`}
                      className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                    >
                      <span className="flex items-center">
                        <AiOutlineFolder size={24} />
                        {isOpen && <span className="ml-2">{sectionType.title}</span>}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </div>
          </ul>
        </nav>

        <div className={`mt-2 ${isOpen ? "flex-row" : "flex-col"} flex gap-1 w-full`}>
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiOutlineHome size={18} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
