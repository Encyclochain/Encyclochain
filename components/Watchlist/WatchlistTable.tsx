"use client"


import { PreviewData } from "@/components/Section/LinkPreview";
import { LinkPreview } from "@/components/Section/LinkPreview";

interface WatchlistTableProps {
    previewData: PreviewData[];
}

const WatchlistTable = ({ previewData }: WatchlistTableProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewData.map((data) => (
                <LinkPreview key={data.id} data={data} color="blue" />
            ))}
        </div>
    );
};

export default WatchlistTable;

