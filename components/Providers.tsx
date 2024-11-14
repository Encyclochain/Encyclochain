// components/Providers.tsx
'use client';

import React from 'react';
import { WatchlistProvider } from '@/components/Watchlist/WatchlistContext';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Layout/SidebarMenu"
import { PrivyProvider } from '@privy-io/react-auth';

interface ProvidersProps {
    children: React.ReactNode;
    topics: { id: number; title: string }[];
}

export default function Providers({ children, topics }: ProvidersProps) {
    return (
        <PrivyProvider
            appId="cm3hg23jk075g94fpypzmp6g9"
            config={{
                appearance: {
                    accentColor: "#6A6FF5",
                    theme: "#FFFFFF",
                    showWalletLoginFirst: false,
                    logo: "https://auth.privy.io/logos/privy-logo.png",
                    walletChainType: "ethereum-only",
                    walletList: ["detected_ethereum_wallets"]
                },
                loginMethods: [
                    "email",
                    "google",
                    "github",
                    "discord"
                ],
                fundingMethodConfig: {
                    moonpay: {
                        useSandbox: true
                    }
                },
                embeddedWallets: {
                    createOnLogin: "off",
                    requireUserPasswordOnCreate: false
                },
                mfa: {
                    noPromptOnMfaRequired: false
                }
            }}
        >
            <SidebarProvider>
                <WatchlistProvider>
                    <div className="flex w-full">
                        <AppSidebar topics={topics} />
                        <SidebarTrigger />
                        <div className="flex-1 flex flex-col overflow-y-auto">
                            {children}
                        </div>
                    </div>
                </WatchlistProvider>
            </SidebarProvider>
        </PrivyProvider>
    );
}
