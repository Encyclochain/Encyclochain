// Watchlist.tsx
"use client"

import { useState } from 'react';
import {Header} from "@/components/Header";
import WatchlistTable from "@/components/Watchlist/WatchlistTable";
import WatchlistModal from "@/components/Watchlist/NewWatchlistModal";
import ShareModal from "@/components/Watchlist/ShareModal";
import { PreviewData } from "@/components/Section/LinkPreview";

export default function Watchlist() {
    const [isNewWatchlistModalOpen, setIsNewWatchlistModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [watchlists, setWatchlists] = useState(['Ma Watchlist']);
    const [selectedWatchlist, setSelectedWatchlist] = useState('Ma Watchlist');
    const [previewData, setPreviewData] = useState<PreviewData[]>([
        {
            id: "1",
            title: "Bitcoin atteint un nouveau record",
            description: "Le prix du Bitcoin a atteint un nouveau sommet historique aujourd'hui...",
            image: "/assets/articles/bitcoin.jpg",
            url: "https://example.com/bitcoin-record",
        },
        {
            id: "2",
            title: "Ethereum 2.0 : Ce qu'il faut savoir",
            description: "La mise à jour tant attendue d'Ethereum est enfin là. Voici ce que ça change...",
            image: "/assets/articles/ethereum.jpg",
            url: "https://example.com/ethereum-2",
        },
        {
            id: "3",
            title: "Les NFTs révolutionnent l'art digital",
            description: "Les tokens non fongibles transforment le marché de l'art numérique...",
            image: "/assets/articles/nft.jpg",
            url: "https://example.com/nft-revolution",
        },
    ]);

    const handleNewWatchlist = (name: string) => {
        setWatchlists([...watchlists, name]);
        setIsNewWatchlistModalOpen(false);
        localStorage.setItem(name, JSON.stringify([]));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm lg:flex bg-white" showArrow={true} />
            <main className="flex-grow pt-[80px]">
                <div className="container mx-auto p-4">
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                        <select value={selectedWatchlist} onChange={(e) => setSelectedWatchlist(e.target.value)}>
                            {watchlists.map((list, index) => (
                                <option key={index} value={list}>{list}</option>
                            ))}
                        </select>
                        <button onClick={() => setIsNewWatchlistModalOpen(true)}>New Watchlist</button>
                        <button>Add alert</button>
                        <button onClick={() => setIsShareModalOpen(true)}>Share</button>
                    </div>

                    <WatchlistTable previewData={previewData} />
                </div>
            </main>

            <WatchlistModal isOpen={isNewWatchlistModalOpen} onClose={() => setIsNewWatchlistModalOpen(false)} onSubmit={handleNewWatchlist} />
            <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} watchlistName={selectedWatchlist} />
        </div>
    );
}
