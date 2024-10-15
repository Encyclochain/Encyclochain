// components/Section/LinkPreview.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import star from '@/assets/Icone/Star.svg';
import { RxExternalLink } from 'react-icons/rx';
import { VscBookmark } from 'react-icons/vsc';
import { PiBookmarkSimpleFill } from 'react-icons/pi';
import Image from 'next/image';
import { PreviewData } from '../../types';

// Importation du contexte des watchlists
import { useWatchlist } from '../../contexts/WatchlistContext';

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

  // État pour gérer l'affichage du menu des watchlists
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // État pour savoir si l'article est dans n'importe quelle watchlist
  const [isInAnyWatchlist, setIsInAnyWatchlist] = useState(false);

  // État pour gérer l'ouverture de la modale de création de watchlist
  const [isNewWatchlistModalOpen, setIsNewWatchlistModalOpen] = useState(false);

  // Vérifier si l'article est dans n'importe quelle watchlist au montage et lors des changements
  useEffect(() => {
    const inAny = watchlists.some((listName) => {
      const items = getWatchlistItems(listName);
      return items.some((item) => item.id === data.id);
    });
    setIsInAnyWatchlist(inAny);
  }, [data.id, watchlists, getWatchlistItems]);

  // Gestionnaire pour ajouter l'article à une watchlist spécifique
  const handleAddToWatchlist = (watchlistName: string) => {
    addToWatchlist(data, watchlistName);
    setIsInAnyWatchlist(true);
    setIsMenuOpen(false);
  };

  // Gestionnaire pour créer une nouvelle watchlist et y ajouter l'article
  const handleCreateNewWatchlist = (name: string) => {
    addWatchlist(name);
    addToWatchlist(data, name);
    setIsInAnyWatchlist(true);
    setIsMenuOpen(false);
    setIsNewWatchlistModalOpen(false);
  };

  // Fallback image logic: if the image is "nopic", use a default image
  const imageSrc = data.image === 'nopic' ? '/assets/articles/bitcoinmagazine.png' : data.image;

  return (
    <div className="h-[100%] w-[100%] relative">
      <Card className="w-[100%] h-[500px]">
        <CardContent className="relative flex items-center w-[100%] h-[404px] md:h-[350px]">
          <a
            href={data.url}
            className="w-[100%] flex flex-col h-[500px] justify-between mt-[150px] max-md:mt-[90px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Image section displaying the preview image */}
            <img
              src={imageSrc}
              alt={data.title}
              style={{ objectFit: 'cover' }}
              className="w-[100%] h-[226px]"
            />

            {/* Section displaying the title, badge, description, and metadata */}
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2 my-[10px]">
                <Badge variant="secondary">Blockchain</Badge>
                <p className="text-sm">5 min read</p>
              </div>

              <h3 className="font-semibold pb-2">{data.title}</h3>
              <p>{data.description}</p>
            </div>

            {/* Section displaying the star rating (5 stars) */}
            <div className="flex ml-[10px]">
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
              <Image src={star} alt="" width={24} height={24} />
            </div>

            {/* Section with author and date information */}
            <div className="flex flex-col w-full pr-[20px] ml-[10px]">
              <div className="flex justify-start gap-[10px]">
                <p>Author: John Doe</p>
                <p>Date: Oct 1, 2023</p>
              </div>

              {/* External link icon */}
              <div className="flex justify-end pb-[10px] w-[100%]">
                <RxExternalLink width={24} height={24} />
              </div>
            </div>
          </a>

          {/* Bookmark button to toggle bookmark state */}
          <button
            className="absolute top-[240px] right-3 cursor-pointer z-10"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            {isInAnyWatchlist ? (
              <PiBookmarkSimpleFill size={24} />
            ) : (
              <VscBookmark size={24} />
            )}
          </button>

          {/* Menu des watchlists */}
          {isMenuOpen && (
            <div className="absolute top-[270px] right-3 bg-white border rounded shadow-lg z-20">
              {watchlists.map((listName) => (
                <div
                  key={listName}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddToWatchlist(listName)}
                >
                  Ajouter à {listName}
                </div>
              ))}
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsNewWatchlistModalOpen(true);
                }}
              >
                + Nouvelle Watchlist
              </div>
            </div>
          )}

          {/* Modale pour créer une nouvelle watchlist */}
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
