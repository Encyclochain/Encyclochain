// Watchlist.tsx
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import WatchlistModal from '@/components/Watchlist/NewWatchlistModal';
import ShareModal from '@/components/Watchlist/ShareModal';
import WatchlistTable from '@/components/Watchlist/WatchlistTable';
import { PreviewData } from '../../types';
import { useWatchlist } from '../../contexts/WatchlistContext';

export default function Watchlist() {
    const { watchlists, addWatchlist, getWatchlistItems, removeFromWatchlist } = useWatchlist();
    const [isNewWatchlistModalOpen, setIsNewWatchlistModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedWatchlist, setSelectedWatchlist] = useState(watchlists[0] || 'Ma Watchlist');
    const [previewData, setPreviewData] = useState<PreviewData[]>([]);

    useEffect(() => {
        const storedWatchlist = getWatchlistItems(selectedWatchlist);
        setPreviewData(storedWatchlist);
    }, [selectedWatchlist, watchlists]);

    const handleRemoveFromWatchlist = (articleId: string) => {
        removeFromWatchlist(articleId, selectedWatchlist);
        setPreviewData(previewData.filter(item => item.id !== articleId));
    };

    const handleNewWatchlist = (name: string) => {
        addWatchlist(name);
        setSelectedWatchlist(name);
        setIsNewWatchlistModalOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                design="z-10 w-full items-center p-5 justify-between font-mono text-sm lg:flex bg-white"
                showArrow={true}
            />
            <main className="flex-grow pt-20">
                <div className="container mx-auto p-4">
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                        <select
                            value={selectedWatchlist}
                            onChange={(e) => setSelectedWatchlist(e.target.value)}
                        >
                            {watchlists.map((list, index) => (
                                <option key={index} value={list}>
                                    {list}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => setIsNewWatchlistModalOpen(true)}>New Watchlist</button>
                        <button>Add alert</button>
                        <button onClick={() => setIsShareModalOpen(true)}>Share</button>
                    </div>
                    <WatchlistTable
                        previewData={previewData}
                        onRemove={handleRemoveFromWatchlist}
                    />
                </div>
            </main>

            <WatchlistModal
                isOpen={isNewWatchlistModalOpen}
                onClose={() => setIsNewWatchlistModalOpen(false)}
                onSubmit={handleNewWatchlist}
            />
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                watchlistName={selectedWatchlist}
            />
        </div>
    );
}
