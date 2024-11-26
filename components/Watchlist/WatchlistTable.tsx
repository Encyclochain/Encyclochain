'use client';

import { PreviewData } from '@/type';
import LinkPreview from '@/components/LinkPreview';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface WatchlistTableProps {
    previewData: PreviewData[]; // Array of articles to display in the watchlist.
    onRemove: (articleId: string) => void; // Callback to handle removing an article from the watchlist.
}

const WatchlistTable = ({ previewData, onRemove }: WatchlistTableProps) => {
    return (
        <>
            {previewData.length === 0 ? (
                // Displays a message if the watchlist is empty.
                <p className="mt-4 font-sans">Aucun article dans votre watchlist.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {/* Dynamically renders a grid of articles. */}
                    {previewData.map(article => (
                        <div key={article.id} className="w-full max-w-xs sm:max-w-sm mx-auto">
                            <div className="relative w-full h-full">
                                {/* Displays a preview of the article. */}
                                <LinkPreview data={article} color="#F7931A" />
                                {/* Button to remove the article from the watchlist. */}
                                <Button
                                    onClick={() => onRemove(article.id)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 z-10"
                                    size="icon"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default WatchlistTable;
