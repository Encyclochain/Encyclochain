'use client';

import { WatchlistProvider } from '@/components/Watchlist/WatchlistContext';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layout/SidebarMenu";
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
                    accentColor: "#6A6FF5", // Sets the primary UI color.
                    theme: "#FFFFFF",       // Enables a light theme.
                    walletChainType: "ethereum-only", // Restricts to Ethereum wallets.
                },
                loginMethods: ["farcaster", "google", "github", "twitter"], 
                // Specifies available login methods.
                fundingMethodConfig: {
                    moonpay: { useSandbox: true } 
                    // Activates Moonpay sandbox for testing.
                },
                embeddedWallets: {
                    createOnLogin: "off" 
                    // Prevents automatic wallet creation at login.
                }
            }}
        >
            <SidebarProvider>
                <WatchlistProvider>
                    <div className="flex w-full">
                        <AppSidebar topics={topics} /> 
                        {/* Renders the sidebar with provided topics. */}
                        <SidebarTrigger /> 
                        {/* Trigger for toggling the sidebar. */}
                        <div className="flex-1 flex flex-col overflow-y-auto">
                            {children} 
                            {/* Main content of the app. */}
                        </div>
                    </div>
                </WatchlistProvider>
            </SidebarProvider>
        </PrivyProvider>
    );
}
