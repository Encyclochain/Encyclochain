// WatchlistModal.tsx
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
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
                    <DialogTitle className='font-garamond'>Créer une nouvelle Watchlist</DialogTitle>
                </DialogHeader>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom de la Watchlist"
                    className="w-full mb-4 font-poppins"
                />
                <DialogFooter>
                    <Button onClick={onClose} variant="outline" className='font-poppins'>Annuler</Button>
                    <Button onClick={() => onSubmit(name)} className='font-poppins'>Créer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WatchlistModal;
