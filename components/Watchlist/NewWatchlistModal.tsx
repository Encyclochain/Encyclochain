"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface WatchlistModalProps {
    isOpen: boolean; // Indicates whether the modal is open or closed.
    onClose: () => void; // Callback function to close the modal.
    onSubmit: (name: string) => void; // Callback function to handle creating a new watchlist.
}

const WatchlistModal = ({ isOpen, onClose, onSubmit }: WatchlistModalProps) => {
    const [name, setName] = useState(''); 
    // Local state for storing the input value (watchlist name).

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* Main dialog component; visibility controlled by `isOpen` prop. */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-garamond'>
                        Créer une nouvelle Watchlist
                    </DialogTitle>
                    {/* Dialog title with a custom font. */}
                </DialogHeader>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom de la Watchlist"
                    className="w-full mb-4 font-poppins"
                />
                {/* Input field for the watchlist name. Updates the `name` state on change. */}
                <DialogFooter>
                    <Button onClick={onClose} variant="outline" className='font-poppins'>
                        Annuler
                    </Button>
                    {/* Cancel button: calls the `onClose` function to close the modal. */}
                    <Button 
                        onClick={() => onSubmit(name)} 
                        className='font-poppins'
                    >
                        Créer
                    </Button>
                    {/* Create button: triggers the `onSubmit` function with the entered name. */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WatchlistModal;
