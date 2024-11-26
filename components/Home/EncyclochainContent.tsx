"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Function to format text by replacing escaped `\n` with actual line breaks.
function formatTextWithLineBreaks(text: string) {
  return text.replace(/\\n/g, "\n").split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}

interface Chapter {
  id: number; // Unique identifier for the chapter.
  title: string; // Title of the chapter.
  description: string | null; // Optional description text for the chapter.
}

interface EncyclochainContentProps {
  chapters: Chapter[]; // Array of chapters passed as props.
}

export default function EncyclochainContent({ chapters }: EncyclochainContentProps) {
  // Sorts chapters by their `id` to ensure consistent display order.
  const sortedChapters = chapters.sort((a, b) => a.id - b.id);

  // State to track the currently active section, initialized with the first chapter title if available.
  const [activeSection, setActiveSection] = useState(
    sortedChapters.length > 0 ? sortedChapters[0].title : ""
  );

  useEffect(() => {
    // Updates the active section if chapters change.
    if (sortedChapters.length > 0) {
      setActiveSection(sortedChapters[0].title);
    }
  }, [sortedChapters]);

  return (
    <Card className="w-full max-w-4xl mx-auto border-none">
      <CardContent>
        {/* Tabs to switch between chapters */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          {/* Tab triggers for chapter titles */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-2 mb-4 sm:mb-8">
            {sortedChapters.map((chapter) => (
              <TabsTrigger
                key={chapter.id}
                value={chapter.title}
                className="capitalize sm:text-lg max-md:bg-[#64748b] max-md:bg-opacity-10 font-garamond text-black"
              >
                {chapter.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Tab content for chapter descriptions */}
          {sortedChapters.map((chapter) => (
            <TabsContent key={chapter.id} value={chapter.title}>
              <div className="space-y-4">
                <p className="text-sm md:text-base font-poppins leading-7">
                  {chapter.description
                    ? formatTextWithLineBreaks(chapter.description) // Formats text with line breaks.
                    : "Description non disponible"} // Fallback for missing descriptions.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
