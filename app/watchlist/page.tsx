"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VscBellDot, VscShare, VscCopy, VscClose } from "react-icons/vsc";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Header } from "@/components/Header";
import { LinkPreview, PreviewData } from "@/components/Section/LinkPreview";

// NewWatchlistModal component
const NewWatchlistModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (name: string) => void }) => {
    const [name, setName] = useState('');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer une nouvelle Watchlist</DialogTitle>
                </DialogHeader>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom de la Watchlist"
                    className="w-full mb-4"
                />
                <DialogFooter>
                    <Button onClick={onClose} variant="outline">Annuler</Button>
                    <Button onClick={() => onSubmit(name)}>Créer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// ShareModal component
const ShareModal = ({ isOpen, onClose, watchlistName }: { isOpen: boolean, onClose: () => void, watchlistName: string }) => {
    const [copied, setCopied] = useState(false);
    const shareUrl = `https://yourwebsite.com/watchlist/${encodeURIComponent(watchlistName)}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const shareOnSocialMedia = (platform: string) => {
        let url = '';
        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out my watchlist: ${watchlistName}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(watchlistName)}`;
                break;
        }
        window.open(url, '_blank');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Partager "{watchlistName}"</DialogTitle>
                </DialogHeader>
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Lien de partage :</p>
                    <div className="flex">
                        <Input
                            type="text"
                            value={shareUrl}
                            readOnly
                            className="flex-grow rounded-r-none"
                        />
                        <Button onClick={copyToClipboard} className="rounded-l-none">
                            {copied ? 'Copié !' : <VscCopy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-2">Partager sur les réseaux sociaux :</p>
                    <div className="flex justify-center space-x-4">
                        <Button onClick={() => shareOnSocialMedia('twitter')} variant="outline">
                            <FaTwitter className="h-5 w-5 text-blue-400" />
                            <span className="sr-only">Partager sur Twitter</span>
                        </Button>
                        <Button onClick={() => shareOnSocialMedia('facebook')} variant="outline">
                            <FaFacebook className="h-5 w-5 text-blue-600" />
                            <span className="sr-only">Partager sur Facebook</span>
                        </Button>
                        <Button onClick={() => shareOnSocialMedia('linkedin')} variant="outline">
                            <FaLinkedin className="h-5 w-5 text-blue-700" />
                            <span className="sr-only">Partager sur LinkedIn</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Main Watchlist component
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
            <Header
                design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm lg:flex bg-white"
                showArrow={true}
            />
            <main className="flex-grow pt-[80px]">
                <div className="container mx-auto p-4">
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                        <Select value={selectedWatchlist} onValueChange={setSelectedWatchlist}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Sélectionner une Watchlist" />
                            </SelectTrigger>
                            <SelectContent>
                                {watchlists.map((list, index) => (
                                    <SelectItem key={index} value={list}>{list}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={() => setIsNewWatchlistModalOpen(true)}>
                            New Watchlist
                        </Button>
                        <Button variant="outline">
                            <VscBellDot className="mr-2" /> Add alert
                        </Button>
                        <Button variant="outline" onClick={() => setIsShareModalOpen(true)}>
                            <VscShare className="mr-2" /> Share
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {previewData.map((data) => (
                            <LinkPreview key={data.id} data={data} color="blue" />
                        ))}
                    </div>
                </div>
            </main>

            <NewWatchlistModal
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