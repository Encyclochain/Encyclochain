"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { VscCopy } from "react-icons/vsc";

interface ShareModalProps {
    isOpen: boolean; // Controls whether the modal is visible.
    onClose: () => void; // Callback to close the modal.
    watchlistName: string; // Name of the watchlist to share.
}

const ShareModal = ({ isOpen, onClose, watchlistName }: ShareModalProps) => {
    const [copied, setCopied] = useState(false); 
    // Tracks whether the share URL has been copied to the clipboard.

    const shareUrl = `https://yourwebsite.com/watchlist/${encodeURIComponent(watchlistName)}`;
    // Constructs the URL to share, encoding the watchlist name for safety.

    const copyToClipboard = () => {
        // Copies the share URL to the clipboard and shows a confirmation for 2 seconds.
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const shareOnSocialMedia = (platform: string) => {
        // Opens the appropriate social media share link in a new tab based on the platform.
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
            {/* Modal dialog controlled by `isOpen` and `onClose`. */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-poppins">
                        Partager "{watchlistName}"
                    </DialogTitle>
                    {/* Modal title showing the name of the watchlist being shared. */}
                </DialogHeader>
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2 font-poppins">Lien de partage :</p>
                    <div className="flex">
                        <Input
                            type="text"
                            value={shareUrl}
                            readOnly
                            className="flex-grow rounded-r-none"
                        />
                        {/* Input field displaying the shareable URL (read-only). */}
                        <Button onClick={copyToClipboard} className="rounded-l-none">
                            {copied ? 'Copié !' : <VscCopy className="h-4 w-4" />}
                        </Button>
                        {/* Button to copy the URL to clipboard, showing confirmation when clicked. */}
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-2">Partager sur les réseaux sociaux :</p>
                    <div className="flex justify-center space-x-4">
                        <Button onClick={() => shareOnSocialMedia('twitter')} variant="outline">
                            <FaTwitter className="h-5 w-5 text-blue-400" />
                            <span className="sr-only font-poppins">Partager sur Twitter</span>
                        </Button>
                        {/* Button to share the URL on Twitter. */}
                        <Button onClick={() => shareOnSocialMedia('facebook')} variant="outline">
                            <FaFacebook className="h-5 w-5 text-blue-600" />
                            <span className="sr-only font-poppins">Partager sur Facebook</span>
                        </Button>
                        {/* Button to share the URL on Facebook. */}
                        <Button onClick={() => shareOnSocialMedia('linkedin')} variant="outline">
                            <FaLinkedin className="h-5 w-5 text-blue-700" />
                            <span className="sr-only font-poppins">Partager sur LinkedIn</span>
                        </Button>
                        {/* Button to share the URL on LinkedIn. */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareModal;
