'use client'; 

import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RxExternalLink } from 'react-icons/rx';
import { VscBookmark } from 'react-icons/vsc';
import { PiBookmarkSimpleFill } from 'react-icons/pi';
import { PreviewData } from '@/type';
import { Button } from "@/components/ui/button";
import { useClickOutside } from '@/hooks/useClickOutside';
import { useWatchlist } from '@/components/Watchlist/WatchlistContext';
import WatchlistModal from '@/components/Watchlist/NewWatchlistModal';

export default function LinkPreview({
  data,
  color,
}: {
  data: PreviewData;
  color: string;
}) {
  const { watchlists, addWatchlist, addToWatchlist } = useWatchlist();

  // State to manage the dropdown menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Tracks if the item is in at least one watchlist
  const [isInAnyWatchlist, setIsInAnyWatchlist] = useState(false);

  // State for controlling the "new watchlist" modal
  const [isNewWatchlistModalOpen, setIsNewWatchlistModalOpen] = useState(false);

  // Image source, with fallback handling
  const [imageSrc, setImageSrc] = useState(
    data.image === 'nopic' ? '/assets/articles/bitcoinmagazine.png' : data.image
  );

  // Ref for the menu dropdown to handle outside clicks
  const menuRef = useRef<HTMLDivElement>(null);

  // List of fallback images if the main image fails to load
  const fallbackImages = [
    '/assets/articles/bitcoinmagazine.png',
    '/assets/alternative-image.png',
  ];

  // Closes the menu when a click is detected outside of it
  useClickOutside(menuRef, () => {
    setIsMenuOpen(false);
  });

  // Handles image loading errors by switching to a fallback image
  const handleImageError = () => {
    const nextImage = fallbackImages.shift();
    if (nextImage) {
      setImageSrc(nextImage);
    }
  };

  // Adds the item to a specific watchlist and updates the state
  const handleAddToWatchlist = (watchlistName: string) => {
    addToWatchlist(data, watchlistName);
    setIsInAnyWatchlist(true);
    setIsMenuOpen(false);
  };

  // Creates a new watchlist and adds the item to it
  const handleCreateNewWatchlist = (name: string) => {
    addWatchlist(name);
    addToWatchlist(data, name);
    setIsInAnyWatchlist(true);
    setIsMenuOpen(false);
    setIsNewWatchlistModalOpen(false);
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm mx-auto h-full">
      <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <CardContent className="flex flex-col h-full">
          {/* Main clickable area linking to the URL */}
          <a
            href={data.url}
            className="flex flex-col h-full flex-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Image section */}
            <div className="w-full h-32 sm:h-40 md:h-44 lg:h-48">
              <img
                src={imageSrc}
                alt={data.title}
                style={{ objectFit: 'cover' }}
                className="w-full h-full rounded-t-lg"
                onError={handleImageError}
              />
            </div>

            {/* Content section with badge, title, and description */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                {/* Category badge */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Blockchain</Badge>
                </div>

                {/* Watchlist button with dropdown menu */}
                <div className="relative" ref={menuRef}>
                  <Button
                    className="text-gray-700 hover:text-gray-900 focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsMenuOpen(!isMenuOpen);
                    }}
                  >
                    {isInAnyWatchlist ? (
                      <PiBookmarkSimpleFill size={20} color={color} />
                    ) : (
                      <VscBookmark size={20} color={color} />
                    )}
                  </Button>

                  {/* Dropdown menu for watchlists */}
                  {isMenuOpen && (
                    <div
                      className="absolute top-full right-0 mt-1 bg-white border rounded shadow-lg z-20 w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* List of existing watchlists */}
                      {watchlists.map((listName) => (
                        <div
                          key={listName}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-xs"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToWatchlist(listName);
                          }}
                        >
                          Ajouter à {listName}
                        </div>
                      ))}
                      {/* Option to create a new watchlist */}
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer border-t text-xs"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          setIsNewWatchlistModalOpen(true);
                        }}
                      >
                        + Nouvelle Watchlist
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Title and description */}
              <div>
                <h3 className="text-sm text-gray-800 mb-1 font-poppins">{data.title}</h3>
                <p className="text-xs text-gray-700 font-poppins">{data.description}</p>
              </div>
            </div>

            {/* Author and date section */}
            <div className="flex justify-between items-center px-3 pb-2">
              <div className="flex gap-2">
                <p className="text-xs text-gray-600 font-poppins">Author: John Doe</p>
                <p className="text-xs text-gray-600 font-poppins">Date: Oct 1, 2023</p>
              </div>
              <RxExternalLink size={16} className="text-gray-600" />
            </div>
          </a>

          {/* Modal for creating a new watchlist */}
          {isNewWatchlistModalOpen && (
            <WatchlistModal
              isOpen={isNewWatchlistModalOpen}
              onClose={() => setIsNewWatchlistModalOpen(false)}
              onSubmit={handleCreateNewWatchlist}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
