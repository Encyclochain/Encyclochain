'use client';
import { PreviewData } from '@/type';
import LinkPreview from '../Section/LinkPreview';
import { useState } from 'react';

const ITEMS_PER_PAGE = 8;

interface CarouselContentProps {
    formattedDataList: PreviewData[];
    color: string;
}

export default function CarouselContent({ formattedDataList, color }: CarouselContentProps) {
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
    const displayedData = formattedDataList.slice(0, displayCount);
    const hasMore = displayCount < formattedDataList.length;
    const canShowLess = displayCount > ITEMS_PER_PAGE;

    return (
        <div className="w-[100%] max-sm:w-[70%]">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 list-none p-0">
                {displayedData.map((formatData) => (
                    <li key={formatData.id} className="font-poppins">
                        <LinkPreview data={formatData} color={color} />
                    </li>
                ))}
            </ul>

            {(hasMore || canShowLess) && (
                <div className="flex justify-center mt-8 gap-4">
                    {canShowLess && (
                        <button
                            onClick={() => setDisplayCount(ITEMS_PER_PAGE)}
                            className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-semibold font-poppins"
                            style={{ color }}
                        >
                            See less
                        </button>
                    )}
                    {hasMore && (
                        <button
                            onClick={() => setDisplayCount(prev => prev + ITEMS_PER_PAGE)}
                            className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-semibold font-poppins"
                            style={{ color }}
                        >
                            See more
                        </button>
                    )}
                </div>
            )}
        </div>
    );
} 