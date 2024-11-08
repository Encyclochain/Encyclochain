// components/Section/LinkPreview.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RxExternalLink } from 'react-icons/rx';
import { VscBookmark } from 'react-icons/vsc';
import { PiBookmarkSimpleFill } from 'react-icons/pi';
import { PreviewData } from '@/type';
import { Button } from "@/components/ui/button";


// import Image from 'next/image'; // Supprimé

// Importation du contexte des watchlists
import { useWatchlist } from '@/components/Watchlist/WatchlistContext';

// Importation de la modale pour créer une nouvelle watchlist
import WatchlistModal from '@/components/Watchlist/NewWatchlistModal';

export default function LinkPreview({
  data,
  color,
}: {
  data: PreviewData;
  color: string;
}) {
  const { watchlists, addWatchlist, addToWatchlist, getWatchlistItems } = useWatchlist();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInAnyWatchlist, setIsInAnyWatchlist] = useState(false);
  const [isNewWatchlistModalOpen, setIsNewWatchlistModalOpen] = useState(false);

  useEffect(() => {
    const inAny = watchlists.some((listName) => {
      const items = getWatchlistItems(listName);
      return items.some((item) => item.id === data.id);
    });
    setIsInAnyWatchlist(inAny);
  }, [data.id, watchlists, getWatchlistItems]);

  const handleAddToWatchlist = (watchlistName: string) => {
    addToWatchlist(data, watchlistName);
    setIsInAnyWatchlist(true);
    setIsMenuOpen(false);
  };

  const handleCreateNewWatchlist = (name: string) => {
    addWatchlist(name);
    addToWatchlist(data, name);
    setIsInAnyWatchlist(true);
    setIsMenuOpen(false);
    setIsNewWatchlistModalOpen(false);
  };

  const imageSrc = data.image === 'nopic' ? '/assets/articles/bitcoinmagazine.png' : data.image;

  return (
    <div className="w-full max-w-xs sm:max-w-sm mx-auto h-full">
      <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <CardContent className="flex flex-col h-full">
          <a
            href={data.url}
            className="flex flex-col h-full flex-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Image */}
            <div className="w-full h-32 sm:h-40 md:h-44 lg:h-48">
              <img
                src={imageSrc}
                alt={data.title}
                style={{ objectFit: 'cover' }}
                className="w-full h-full rounded-t-lg"
              />
            </div>

            {/* Content */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              {/* Badge, Read Time et Bouton Watchlist */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Blockchain</Badge>
                </div>
                {/* Bouton Watchlist */}
                <Button
                  className="text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  {isInAnyWatchlist ? (
                    <PiBookmarkSimpleFill size={20} color={color} />
                  ) : (
                    <VscBookmark size={20} color={color} />
                  )}
                </Button>
              </div>

              {/* Titre et Description */}
              <div>
                <h3 className="text-sm text-gray-800 mb-1 font-poppins">{data.title}</h3>
                <p className="text-xs text-gray-700 font-poppins">{data.description}</p>
              </div>

              {/* Espace Vide en Bas de la Description */}
              <div className="mt-auto">
                {/* Vous pouvez ajouter des éléments ici si nécessaire */}
              </div>
            </div>

            {/* Stars (commenté) */}
            {/*
            <div className="flex items-center px-3 pb-1">
              {[...Array(5)].map((_, index) => (
                <img key={index} src={star} alt="Star" width={16} height={16} />
              ))}
            </div>
            */}

            {/* Author & Date */}
            <div className="flex justify-between items-center px-3 pb-2">
              <div className="flex gap-2">
                <p className="text-xs text-gray-600 font-poppins">Author: John Doe</p>
                <p className="text-xs text-gray-600 font-poppins">Date: Oct 1, 2023</p>
              </div>
              <RxExternalLink size={16} className="text-gray-600" />
            </div>
          </a>

          {/* Watchlist Menu */}
          {isMenuOpen && (
            <div className="absolute top-40 right-2 bg-white border rounded shadow-lg z-20 w-40">
              {watchlists.map((listName) => (
                <div
                  key={listName}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-xs"
                  onClick={() => handleAddToWatchlist(listName)}
                >
                  Ajouter à {listName}
                </div>
              ))}
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer border-t text-xs"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsNewWatchlistModalOpen(true);
                }}
              >
                + Nouvelle Watchlist
              </div>
            </div>
          )}

          {/* Watchlist Modal */}
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
