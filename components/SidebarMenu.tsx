"use client";  // Ensure this is marked as a Client Component

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-[#111213] h-screen p-4 flex flex-col  justify-between transition-width duration-300 ease-in-out z-50`}
      >
        <p className='font-garamond text-white font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter text-center'>
          {isOpen ? 'Encyclochain' : 'EC'}
        </p>
        <div className='flex items-center justify-center bg-white mt-[10px] gap-[10px] br-[40px] p-[4px] rounded-[8px]  border-solid border-2 border-[#8f96a3] outline-none'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          {isOpen && (
            <input type="text" className=' bg-transparent outline-none ' placeholder='Search...'  />
          )}
        </div>
        {/* Navigation Links */}
        <nav className="flex-grow relative">
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-white focus:outline-none bg-[#111213] rounded-r-full p-2"
          >
            {isOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M18.29 17.29a.996.996 0 0 0 0-1.41L14.42 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L12.3 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01"/><path fill="currentColor" d="M11.7 17.29a.996.996 0 0 0 0-1.41L7.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L5.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01"/></svg>: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M5.7 6.71a.996.996 0 0 0 0 1.41L9.58 12L5.7 15.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L7.12 6.71c-.39-.39-1.03-.39-1.42 0"/><path fill="currentColor" d="M12.29 6.71a.996.996 0 0 0 0 1.41L16.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L13.7 6.7c-.38-.38-1.02-.38-1.41.01"/></svg>}
          </button>
          <ul className="mt-4 space-y-4 mb-[20px]">
            <div className='border-b pb-[10px]'>
              {isOpen && <p className='text-white'>Your profile</p>}
            </div>
            <li>
              <Link href="http://localhost:3000/" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                {isOpen && <span className="ml-2">Home</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/watchlist" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
                {isOpen && <span className="ml-2">Watchlist</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contribution" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 256 256"><path fill="currentColor" d="M229.12 142.65a22.43 22.43 0 0 0-19.55-3.88l-45.24 10.4A26 26 0 0 0 140 114H89.94a29.78 29.78 0 0 0-21.21 8.79L45.52 146H16a14 14 0 0 0-14 14v40a14 14 0 0 0 14 14h104a6 6 0 0 0 1.46-.18l64-16a7 7 0 0 0 .89-.3L225.17 181a2.5 2.5 0 0 0 .33-.15a22.6 22.6 0 0 0 3.62-38.18ZM14 200v-40a2 2 0 0 1 2-2h26v44H16a2 2 0 0 1-2-2m206.28-30l-38.2 16.27L119.26 202H54v-47.51l23.21-23.22A17.88 17.88 0 0 1 89.94 126H140a14 14 0 0 1 0 28h-28a6 6 0 0 0 0 12h32a6 6 0 0 0 1.34-.15l67-15.41l.24-.06a10.6 10.6 0 0 1 7.7 19.62M155.76 60.24a6 6 0 0 1 0-8.48l32-32a6 6 0 0 1 8.48 0l32 32a6 6 0 1 1-8.48 8.48L198 38.49V104a6 6 0 0 1-12 0V38.49l-21.76 21.75a6 6 0 0 1-8.48 0"/></svg>
                {isOpen && <span className="ml-2">Contribution</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/alerts" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.996a7.49 7.49 0 0 1 7.496 7.25l.004.25v4.097l1.38 3.156a1.25 1.25 0 0 1-1.145 1.75L15 18.502a3 3 0 0 1-5.995.177L9 18.499H4.275a1.25 1.25 0 0 1-1.147-1.747L4.5 13.594V9.496c0-4.155 3.352-7.5 7.5-7.5M13.5 18.5l-3 .002a1.5 1.5 0 0 0 2.993.145zM12 3.496c-3.32 0-6 2.674-6 6v4.41L4.656 17h14.697L18 13.907V9.509l-.003-.225A5.99 5.99 0 0 0 12 3.496"/></svg>
                {isOpen && <span className="ml-2">Alert</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/multicharts" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'Redacted'}</span>
              </Link>
            </li>
          </ul>
          <div className='border-b pb-[10px]'>
              {isOpen && <p className='text-white'>Watchlist</p>}
            </div>
        </nav>

        {/* Connect Wallet Button */}
                <div className={`mt-2 ${isOpen ? 'flex-row' : 'flex-col'} flex gap-1 w-full`}>
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.45 0C16.568 0 17.481 0.901 17.5 2.025V20L15.35 18.1L14.14 16.98L12.86 15.79L13.39 17.64H2.05C1.511 17.6387 0.994078 17.4258 0.610619 17.047C0.227159 16.6682 0.00786711 16.1539 0 15.615L0 2.06C0 0.932 0.901 0.019 2.015 0H15.45ZM7.32 4.78L7.22 4.66H7.163C6.89 4.669 5.677 4.76 4.41 5.71L4.362 5.802C4.111 6.292 2.97 8.674 2.97 11.54L2.99 11.573C3.132 11.79 4.009 12.996 6.02 13.06L6.315 12.699L6.69 12.23C5.524 11.881 5.024 11.179 4.95 11.066L4.94 11.05L4.981 11.077C5.026 11.107 5.108 11.157 5.22 11.22C5.23 11.23 5.24 11.24 5.26 11.25C5.29 11.27 5.32 11.28 5.35 11.3C5.6 11.44 5.85 11.55 6.08 11.64C6.49 11.8 6.98 11.96 7.55 12.07C8.279 12.206 9.13 12.257 10.058 12.095L10.14 12.08C10.61 12 11.09 11.86 11.59 11.65C11.94 11.52 12.33 11.33 12.74 11.06L12.724 11.085C12.628 11.225 12.104 11.918 10.93 12.25L11.095 12.457C11.348 12.771 11.59 13.06 11.59 13.06C13.8 12.99 14.65 11.54 14.65 11.54C14.65 8.32 13.21 5.71 13.21 5.71C11.972 4.781 10.785 4.673 10.477 4.661L10.4 4.66L10.26 4.82C11.768 5.281 12.56 5.923 12.72 6.063L12.75 6.09C11.2177 5.24492 9.4541 4.91534 7.72 5.15C7.66 5.15 7.61 5.16 7.55 5.17L7.494 5.175C7.114 5.214 6.297 5.354 5.28 5.8L5.135 5.868C4.953 5.954 4.821 6.021 4.75 6.058L4.69 6.09C4.69 6.09 5.503 5.316 7.266 4.796L7.32 4.78ZM6.94 8.39C7.51 8.39 7.97 8.89 7.96 9.5C7.96 10.11 7.51 10.61 6.94 10.61C6.38 10.61 5.92 10.11 5.92 9.5C5.92 8.89 6.37 8.39 6.94 8.39ZM10.59 8.39C11.16 8.39 11.61 8.89 11.61 9.5C11.61 10.11 11.16 10.61 10.59 10.61C10.03 10.61 9.57 10.11 9.57 9.5C9.57 8.89 10.02 8.39 10.59 8.39Z" fill="white"/>
            </svg>
          </Button>
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="20px" viewBox="0 0 128 128"><path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z" fill="white"/></svg></Button>
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="20px" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 12h9m0 0l-3.333-4M22 12l-3.333 4M14 7V5.174a2 2 0 0 0-2.166-1.993l-8 .666A2 2 0 0 0 2 5.84v12.32a2 2 0 0 0 1.834 1.993l8 .667A2 2 0 0 0 14 18.826V17"/></svg></Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
