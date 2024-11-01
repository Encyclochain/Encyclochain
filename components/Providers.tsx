// components/Providers.tsx
'use client';

import React from 'react';
import { WatchlistProvider } from '@/components/Watchlist/WatchlistContext'; // Ajustez le chemin si nécessaire
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Layout/SidebarMenu"

interface ProvidersProps {
    children: React.ReactNode;
    topics: { id: number; title: string }[]; // Type des topics
}

export default function Providers({ children, topics }: ProvidersProps) {
    return (

        <SidebarProvider>
        <WatchlistProvider>
            <div className="flex w-full">
            <AppSidebar topics={topics}/>
            <SidebarTrigger />
            <div className="flex-1 flex flex-col overflow-y-auto">
                    {children}
                </div>
            </div>
        </WatchlistProvider>
        </SidebarProvider>

    );
}
