// ShareModal.tsx
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { VscCopy } from "react-icons/vsc";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    watchlistName: string;
}

const ShareModal = ({ isOpen, onClose, watchlistName }: ShareModalProps) => {
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

export default ShareModal;
