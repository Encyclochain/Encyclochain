"use client";

import { useState } from "react";  // Hook to manage state
import Link from "next/link";  // Next.js link component for navigation
import { AiOutlineSearch, AiOutlineHome, AiOutlineFolder, AiOutlineEye, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";  // Import icons
import { Button } from "../ui/Button";  // Custom Button component

// Typing for the topic prop
interface topic {
  id: number;
  title: string;
}

// Typing for the props of the SidebarMenu component
interface SidebarMenuProps {
  topics: topic[];  // Array of section types passed from the server component
}

// SidebarMenu component
function SidebarMenu({ topics }: SidebarMenuProps) {
  const [isOpen, setIsOpen] = useState(true);  // State to track whether the sidebar is open or closed

  return (
    <div className="flex">
      {/* Sidebar container */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-[#111213] h-screen p-4 flex flex-col justify-between transition-width duration-300 ease-in-out z-50`}
      >
        {/* Sidebar title */}
        <p className="font-garamond text-white font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter text-center">
          {isOpen ? "Encyclochain" : "EC"}  {/* Display full name if open, initials if closed */}
        </p>

        {/* Search bar */}
        <div className="flex items-center justify-center bg-white mt-[10px] gap-[10px] br-[40px] p-[4px] rounded-[8px] border-solid border-2 border-[#8f96a3] outline-none">
          <AiOutlineSearch className="text-black" size={24} />
          {isOpen && (
            <input type="text" className="bg-transparent outline-none" placeholder="Search..." />  
          )}{/* Input only shown when sidebar is open */}
        </div>

        {/* Sidebar navigation */}
        <nav className="flex-grow relative">
          {/* Button to toggle the sidebar open/close */}
          <Button
            onClick={() => setIsOpen(!isOpen)}  // Toggle sidebar state on click
            className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-white focus:outline-none bg-[#111213] rounded-r-full p-2"
          >
            {isOpen ? <AiOutlineLeft size={24} /> : <AiOutlineRight size={24} />}  {/* Icon changes based on state */}
          </Button>

          <ul className="mt-4 space-y-4 mb-[20px]">
            {/* User profile section */}
            <div className="border-b pb-[10px]">
              {isOpen && <p className="text-white">Your profile</p>}  {/* Text only displayed when sidebar is open */}
            </div>

            {/* Home link */}
            <li>
              <Link href="/" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                <span className="flex items-center">
                  <AiOutlineHome size={24} />
                  {isOpen && <span className="ml-2">Home</span>}  {/* "Home" label only displayed when sidebar is open */}
                </span>
              </Link>
            </li>

            {/* Watchlist link */}
            <li>
              <Link href="/watchlist" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                <span className="flex items-center">
                  <AiOutlineEye size={24} />
                  {isOpen && <span className="ml-2">Watchlist</span>}  {/* "Watchlist" label only displayed when sidebar is open */}
                </span>
              </Link>
            </li>

            {/* Sections header */}
            <div className="border-b pb-[10px]">{isOpen && <p className="text-white">Sections</p>}</div>

            {/* Dynamic section list */}
            <div className="overflow-y-auto max-h-[400px]">
              {/* Conditional rendering if no sections are available */}
              {topics.length === 0 ? (
                <p className="text-white">No sections available</p>
              ) : (
                // Loop over section types and display them
                topics.map((topic) => (
                  <li key={topic.id}>
                    <Link
                      href={`/topic/${topic.title}`}
                      className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                    >
                      <span className="flex items-center">
                        <AiOutlineFolder size={24} />
                        {isOpen && <span className="ml-2">{topic.title}</span>}  {/* Display section title when sidebar is open */}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </div>
          </ul>
        </nav>

        {/* Bottom Button */}
        <div className={`mt-2 ${isOpen ? "flex-row" : "flex-col"} flex gap-1 w-full`}>
          {/* Home Button in footer */}
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiOutlineHome size={18} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
