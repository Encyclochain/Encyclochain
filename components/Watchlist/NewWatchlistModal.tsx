// WatchlistModal.tsx
"use client"

import React, { useState } from 'react';
import { button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";

interface WatchlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
}

const WatchlistModal = ({ isOpen, onClose, onSubmit }: WatchlistModalProps) => {
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
                    <button onClick={onClose} variant="outline">Annuler</button>
                    <button onClick={() => onSubmit(name)}>Créer</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WatchlistModal;
