// WatchlistTable.tsx
'use client';

import { PreviewData } from '@/type';
import LinkPreview from '@/components/Section/LinkPreview';
import { Button } from "@/components/ui/button";


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
                        <div key={article.id} className="relative">
                            <LinkPreview data={article} color="#F7931A" />
                            <Button
                                onClick={() => onRemove(article.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded font-poppins"
                            >
                                Retirer
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default WatchlistTable;
