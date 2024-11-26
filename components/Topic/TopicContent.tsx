"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface SectionContentProps {
    page: string; // The current page or section being displayed.
    chapters: Chapter[]; // Array of chapter objects containing ID, title, and description.
}

interface Chapter {
    id: number; // Unique identifier for the chapter.
    title: string; // Chapter title.
    description: string | null; // Optional description of the chapter.
}

// Function to replace `\n` with `<br />` for rendering line breaks correctly.
function formatTextWithLineBreaks(text: string) {
    return text.replace(/\\n/g, '\n').split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
}

export default function TopicContent({ page, chapters }: SectionContentProps) {
    // Sorts chapters by ID to ensure consistent order.
    const sortedChapters = chapters.sort((a, b) => a.id - b.id);

    // State for managing the active tab; initialized with the first chapter title.
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        // Automatically sets the first chapter as active if available.
        if (sortedChapters.length > 0) {
            setActiveSection(sortedChapters[0].title);
        }
    }, [sortedChapters]); // Ensures the state updates when chapters change.

    return (
        <Card className="w-full max-w-4xl mx-auto border-none">
            <CardContent>
                <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
                    {/* Renders a tab trigger for each chapter */}
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 sm:mb-8">
                        {sortedChapters.map((chapter) => (
                            <TabsTrigger 
                                key={chapter.id} 
                                value={chapter.title} 
                                className="capitalize text-xs sm:text-sm max-md:bg-[#64748b] max-md:bg-opacity-10"
                            >
                                {chapter.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    
                    {/* Renders the content for each chapter */}
                    {sortedChapters.map((chapter) => (
                        <TabsContent key={chapter.id} value={chapter.title}>
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-bold font-garamond">{chapter.title}</h2>
                                {/* Formats description text with line breaks */}
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
