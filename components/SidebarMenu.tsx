"use client";  // Ensure this is marked as a Client Component

import React, { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } bg-[#111213] h-screen p-4 flex flex-col  justify-between transition-width duration-300 ease-in-out z-50`}
      >
        <p className='font-garamond text-white font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter'>
          {isOpen ? 'Encyclochain' : 'EC'}
        </p>
        <input type="text" className='mt-[10px] br-[40px] p-[10px] rounded  border-solid border-2 border-[#8f96a3] outline-none '/>
        {/* Navigation Links */}
        <nav className="flex-grow relative">
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-white focus:outline-none bg-[#111213] rounded-r-full p-2"
          >
            {isOpen ? '<<' : '>>'}
          </button>
          <ul className="mt-4 space-y-4">
            <div className='border-b pb-[10px]'>
              {isOpen && <p className='text-white'>Your profile</p>}
            </div>
            <li>
              <Link href="/dashboard" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'Home'}</span>
              </Link>
            </li>
            <li>
              <Link href="/explorer" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'Section'}</span>
              </Link>
            </li>
            <li>
              <Link href="/alerts" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'Watchlist'}</span>
              </Link>
            </li>
            <li>
              <Link href="/watchlist" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'Contribution'}</span>
              </Link>
            </li>
            <li>
              <Link href="/multicharts" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'Redacted'}</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Connect Wallet Button */}
        <div className={`mt-auto ${isOpen ? 'flex' : 'hidden'} flex-col gap-[10px]`}>
          <button className="flex-1 py-2 px-2 bg-transparent text-white rounded border-solid border-2 border-[#8f96a3] outline-none text-sm">
            {isOpen ? 'Login' : 'Log'}
          </button>
          <button className="flex-1 py-2 px-2 bg-transparent text-white rounded border-solid border-2 border-[#8f96a3] outline-none text-sm">
            {isOpen ? 'Signup' : 'Sign'}
          </button>
        </div>
        {!isOpen && (
          <div className="flex flex-col mt-auto gap-[10px]">
            <button className="flex-1 py-2 px-2 bg-transparent text-white rounded border-solid border-2 border-[#8f96a3] outline-none text-sm flex justify-center">
              Log
            </button>
            <button className="flex-1 py-2 px-2 bg-transparent text-white rounded border-solid border-2 border-[#8f96a3] outline-none text-sm flex justify-center">
              Sign
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
