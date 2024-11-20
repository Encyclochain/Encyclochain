'use client';

import React, { useEffect } from 'react';
import { WatchlistProvider } from '@/components/Watchlist/WatchlistContext';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layout/SidebarMenu";
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';

interface ProvidersProps {
    children: React.ReactNode;
    topics: { id: number; title: string }[];
}

export default function Providers({ children, topics }: ProvidersProps) {
    const { authenticated, getAccessToken } = usePrivy();

    useEffect(() => {
        const authenticateUser = async () => {
            if (authenticated) {
                try {
                    const token = await getAccessToken();
                    const response = await fetch('@/app/api/authenticate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        console.error('Erreur lors de l\'authentification de l\'utilisateur:', data.message);
                    } else {
                        console.log('Utilisateur authentifié:', data.user);
                        // Vous pouvez stocker les informations utilisateur si nécessaire
                    }
                } catch (error) {
                    console.error('Erreur lors de l\'appel à l\'API d\'authentification:', error);
                }
            }
        };

        authenticateUser();
    }, [authenticated, getAccessToken]);

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
                    "farcaster",
                    "google",
                    "github",
                    "twitter"
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
