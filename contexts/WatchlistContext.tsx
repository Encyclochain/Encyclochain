// contexts/WatchlistContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { PreviewData } from '../types';

interface WatchlistContextProps {
    watchlists: string[];
    addWatchlist: (name: string) => void;
    getWatchlistItems: (listName: string) => PreviewData[];
    addToWatchlist: (article: PreviewData, listName: string) => void;
    removeFromWatchlist: (articleId: string, listName: string) => void;
}

const WatchlistContext = createContext<WatchlistContextProps | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
    const [watchlists, setWatchlists] = useState<string[]>(['Ma Watchlist']);

    // Charger les watchlists depuis le localStorage au montage
    useEffect(() => {
        const storedWatchlists = localStorage.getItem('watchlists');
        if (storedWatchlists) {
            setWatchlists(JSON.parse(storedWatchlists));
        } else {
            localStorage.setItem('watchlists', JSON.stringify(['Ma Watchlist']));
            localStorage.setItem('watchlist_Ma Watchlist', JSON.stringify([]));
        }
    }, []);

    const addWatchlist = (name: string) => {
        const updatedWatchlists = [...watchlists, name];
        setWatchlists(updatedWatchlists);
        localStorage.setItem('watchlists', JSON.stringify(updatedWatchlists));
        // Créer une nouvelle watchlist vide
        localStorage.setItem(`watchlist_${name}`, JSON.stringify([]));
    };

    const getWatchlistItems = (listName: string): PreviewData[] => {
        const data = localStorage.getItem(`watchlist_${listName}`);
        return data ? JSON.parse(data) : [];
    };

    const addToWatchlist = (article: PreviewData, listName: string) => {
        const watchlist = getWatchlistItems(listName);
        // Vérifier si l'article est déjà dans la watchlist
        if (!watchlist.some((item) => item.id === article.id)) {
            watchlist.push(article);
            localStorage.setItem(`watchlist_${listName}`, JSON.stringify(watchlist));
        }
    };

    const removeFromWatchlist = (articleId: string, listName: string) => {
        const watchlist = getWatchlistItems(listName);
        const updatedWatchlist = watchlist.filter((item) => item.id !== articleId);
        localStorage.setItem(`watchlist_${listName}`, JSON.stringify(updatedWatchlist));
    };

    return (
        <WatchlistContext.Provider
            value={{ watchlists, addWatchlist, getWatchlistItems, addToWatchlist, removeFromWatchlist }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
};
