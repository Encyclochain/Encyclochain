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
        } bg-gray-900 h-screen p-4 flex flex-col fixed justify-between transition-width duration-300 ease-in-out`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? '<<' : '>>'}
        </button>

        <input type="text" className='mt-[10px] br-[40px]'/>

        {/* Navigation Links */}
        <nav className="flex-grow">
          <ul className="mt-4 space-y-4">
            <li>
              <Link href="/dashboard" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'home'}</span>
              </Link>
            </li>
            <li>
              <Link href="/explorer" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'section'}</span>
              </Link>
            </li>
            <li>
              <Link href="/alerts" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'watchlist'}</span>
              </Link>
            </li>
            <li>
              <Link href="/watchlist" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'contribution'}</span>
              </Link>
            </li>
            <li>
              <Link href="/multicharts" className="text-white block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {/* Placeholder for icon */}
                <span>{isOpen && 'redacted'}</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Connect Wallet Button */}
        <div className="mt-auto">
          <button className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-500 transition-colors">
            {isOpen ? 'Connect Wallet' : 'Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
