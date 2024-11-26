'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { PreviewData } from '@/type';

interface WatchlistContextProps {
    watchlists: string[]; // Array of watchlist names.
    addWatchlist: (name: string) => void; // Function to add a new watchlist.
    getWatchlistItems: (listName: string) => PreviewData[]; // Retrieves items in a specific watchlist.
    addToWatchlist: (article: PreviewData, listName: string) => void; // Adds an article to a specific watchlist.
    removeFromWatchlist: (articleId: string, listName: string) => void; // Removes an article from a specific watchlist.
}

const WatchlistContext = createContext<WatchlistContextProps | undefined>(undefined);
// Context to store watchlist-related state and actions.

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
    const [watchlists, setWatchlists] = useState<string[]>(['Ma Watchlist']);
    // State to track all available watchlists. Initializes with a default watchlist.

    useEffect(() => {
        // Loads watchlists from localStorage on component mount.
        const storedWatchlists = localStorage.getItem('watchlists');
        if (storedWatchlists) {
            setWatchlists(JSON.parse(storedWatchlists));
        } else {
            // If no data exists, initialize with a default watchlist.
            localStorage.setItem('watchlists', JSON.stringify(['Ma Watchlist']));
            localStorage.setItem('watchlist_Ma Watchlist', JSON.stringify([]));
        }
    }, []);

    const addWatchlist = (name: string) => {
        // Adds a new watchlist to the state and localStorage.
        const updatedWatchlists = [...watchlists, name];
        setWatchlists(updatedWatchlists);
        localStorage.setItem('watchlists', JSON.stringify(updatedWatchlists));
        localStorage.setItem(`watchlist_${name}`, JSON.stringify([])); // Creates an empty watchlist.
    };

    const getWatchlistItems = (listName: string): PreviewData[] => {
        // Retrieves the items of a specific watchlist from localStorage.
        const data = localStorage.getItem(`watchlist_${listName}`);
        return data ? JSON.parse(data) : [];
    };

    const addToWatchlist = (article: PreviewData, listName: string) => {
        // Adds an article to a specific watchlist if it's not already there.
        const watchlist = getWatchlistItems(listName);
        if (!watchlist.some((item) => item.id === article.id)) {
            watchlist.push(article);
            localStorage.setItem(`watchlist_${listName}`, JSON.stringify(watchlist));
        }
    };

    const removeFromWatchlist = (articleId: string, listName: string) => {
        // Removes an article from a specific watchlist by its ID.
        const watchlist = getWatchlistItems(listName);
        const updatedWatchlist = watchlist.filter((item) => item.id !== articleId);
        localStorage.setItem(`watchlist_${listName}`, JSON.stringify(updatedWatchlist));
    };

    return (
        <WatchlistContext.Provider
            value={{
                watchlists, // List of watchlist names.
                addWatchlist, // Function to create a new watchlist.
                getWatchlistItems, // Function to fetch items from a watchlist.
                addToWatchlist, // Function to add an item to a watchlist.
                removeFromWatchlist, // Function to remove an item from a watchlist.
            }}
        >
            {children}
            {/* Provides the context to all child components. */}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    // Ensures the hook is only used within the context provider.
    return context;
};
