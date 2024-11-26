"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface SectionContentProps {
    page: string; // Current page identifier (not used in rendering here but could be extended).
    chapters: Chapter[]; // Array of chapters, each containing an ID, title, and optional description.
}

interface Chapter {
    id: number; // Unique identifier for the chapter.
    title: string; // Title of the chapter.
    description: string | null; // Description text for the chapter, which may be null.
}

// Function to format text by replacing escaped `\n` characters with actual line breaks.
function formatTextWithLineBreaks(text: string) {
    return text.replace(/\\n/g, '\n').split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
}

export default function SectionContent({ page, chapters }: SectionContentProps) {
    // Sorts chapters by their `id` to ensure consistent display order.
    const sortedChapters = chapters.sort((a, b) => a.id - b.id);

    // State to track the currently active tab (initialized with an empty string).
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        // Sets the first chapter as the default active section if available.
        if (sortedChapters.length > 0) {
            setActiveSection(sortedChapters[0].title);
        }
    }, [sortedChapters]); // Updates if the sorted chapters list changes.

    return (
        <Card className="w-full max-w-4xl mx-auto border-none">
            <CardContent>
                {/* Renders tabs with the active section state */}
                <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
                    {/* Tab list with triggers for each chapter */}
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 sm:mb-8 font-garamond">
                        {sortedChapters.map((chapter) => (
                            <TabsTrigger
                                key={chapter.id}
                                value={chapter.title}
                                className="capitalize text-xs sm:text-sm max-md:bg-[#64748b] max-md:bg-opacity-10 font-garamond"
                            >
                                {chapter.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    
                    {/* Tab content for each chapter */}
                    {sortedChapters.map((chapter) => (
                        <TabsContent key={chapter.id} value={chapter.title}>
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-bold font-garamond">{chapter.title}</h2>
                                {/* Formats description with line breaks or shows a fallback if none */}
                                <p className="text-sm md:text-base font-poppins leading-7">
                                    {chapter.description
                                        ? formatTextWithLineBreaks(chapter.description)
                                        : "Description non disponible"}
                                </p>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
}
