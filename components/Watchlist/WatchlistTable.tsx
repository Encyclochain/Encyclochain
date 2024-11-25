// WatchlistTable.tsx
'use client';

import { PreviewData } from '@/type';
import LinkPreview from '@/components/LinkPreview';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface WatchlistTableProps {
    previewData: PreviewData[];
    onRemove: (articleId: string) => void;
}

const WatchlistTable = ({ previewData, onRemove }: WatchlistTableProps) => {
    return (
        <>
            {previewData.length === 0 ? (
                <p className="mt-4 font-sans">Aucun article dans votre watchlist.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {previewData.map(article => (
                        <div key={article.id} className="w-full max-w-xs sm:max-w-sm mx-auto">
                            <div className="relative w-full h-full">
                                <LinkPreview data={article} color="#F7931A" />
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
