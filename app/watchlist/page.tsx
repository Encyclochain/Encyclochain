'use client';  // Notez bien la syntaxe exacte et placez cela sans commentaire

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { LinkPreview, PreviewData } from "@/components/LinkPreview";
import { VscBellDot, VscShare } from "react-icons/vsc";
import { Header } from "@/components/Header";

// Définition des types pour les props de NewWatchlistModal
interface NewWatchlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, isPublic: boolean) => void;
}

// Composant pour la modale de nouvelle watchlist avec validation
const NewWatchlistModal: React.FC<NewWatchlistModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = () => {
        if (name.trim() === '') {
            setError("Le nom de la Watchlist ne peut pas être vide.");
        } else {
            setError(null);
            onSubmit(name, false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleOutsideClick}
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Créer une nouvelle Watchlist</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom de la Watchlist"
                    className={`w-full p-2 mb-4 border rounded ${error ? 'border-red-500' : ''}`}
                    aria-label="Nom de la Watchlist"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex justify-end">
                    <Button onClick={onClose} variant="outline" className="mr-2">Annuler</Button>
                    <Button onClick={handleSubmit} disabled={name.trim() === ''}>Créer</Button>
                </div>
            </div>
        </div>
    );
};

const Watchlist: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [watchlists, setWatchlists] = useState<string[]>(['Ma Watchlist']);

    // Données factices pour la démonstration
    const mockData: PreviewData = {
        title: "Exemple d'article",
        description: "Ceci est une description d'exemple pour un article de la watchlist.",
        image: "assets/articles/bitcoinmagazine.png",
        url: "https://example.com",
    };

    // Utilisation de useCallback pour optimiser les performances
    const handleNewWatchlist = useCallback((name: string) => {
        setWatchlists((prevWatchlists) => [...prevWatchlists, name]);
        setIsModalOpen(false);
        console.log(`Nouvelle watchlist créée: ${name}`);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                design="z-10 w-full items-center p-[20px] justify-between font-mono text-sm lg:flex bg-white"
                showArrow={true}
            />
            <main className="flex-grow pt-[80px]">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <select className="border rounded p-2">
                            {watchlists.map((list, index) => (
                                <option key={index} value={list}>{list}</option>
                            ))}
                        </select>
                        <Button variant="outline" onClick={() => setIsModalOpen(true)}>Nouvelle Watchlist</Button>
                        <Button variant="outline"><VscBellDot className="mr-2" /> Ajouter une alerte</Button>
                        <Button variant="outline"><VscShare className="mr-2" /> Partager</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <LinkPreview data={mockData} color="blue" />
                        <LinkPreview data={mockData} color="blue" />
                        <LinkPreview data={mockData} color="blue" />
                    </div>
                </div>
            </main>

            <NewWatchlistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleNewWatchlist}
            />
        </div>
    );
};

export default Watchlist;
