// components/Providers.tsx
'use client';

import React from 'react';
import { WatchlistProvider } from '../contexts/WatchlistContext'; // Ajustez le chemin si nécessaire
import SidebarMenu from './Layout/SidebarMenu'; // Ajustez le chemin si nécessaire

interface ProvidersProps {
    children: React.ReactNode;
    topics: { id: number; title: string }[]; // Type des topics
}

export default function Providers({ children, topics }: ProvidersProps) {
    return (
        <WatchlistProvider>
            <div className="flex w-full">
                <SidebarMenu topics={topics} />
                <div className="flex-1 flex flex-col overflow-y-auto">
                    {children}
                </div>
            </div>
        </WatchlistProvider>
    );
}
