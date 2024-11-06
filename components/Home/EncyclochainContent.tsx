"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Fonction pour corriger les éventuels échappements de \n et les transformer en <br />
function formatTextWithLineBreaks(text: string) {
  return text.replace(/\\n/g, "\n").split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}

interface Chapter {
  id: number;
  title: string;
  description: string | null;
}

interface EncyclochainContentProps {
  chapters: Chapter[]; // Les chapitres sont passés en tant que props
}

export default function EncyclochainContent({ chapters }: EncyclochainContentProps) {
  // Trie les chapitres par ID
  const sortedChapters = chapters.sort((a, b) => a.id - b.id);

  // Initialisation de l'onglet actif avec le premier chapitre si disponible
  const [activeSection, setActiveSection] = useState(sortedChapters.length > 0 ? sortedChapters[0].title : "");

  useEffect(() => {
    if (sortedChapters.length > 0) {
      setActiveSection(sortedChapters[0].title);
    }
  }, [sortedChapters]);

  return (
    <Card className="w-full max-w-4xl mx-auto border-none">
      <CardContent>
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-2 mb-4 sm:mb-8">
            {sortedChapters.map((chapter) => (
              <TabsTrigger key={chapter.id} value={chapter.title} className="capitalize text-xs sm:text-sm max-md:bg-[#64748b] max-md:bg-opacity-10">
                {chapter.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {sortedChapters.map((chapter) => (
            <TabsContent key={chapter.id} value={chapter.title}>
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">{chapter.title}</h2>
                <p className="text-sm md:text-base">
                  {chapter.description ? formatTextWithLineBreaks(chapter.description) : "Description non disponible"}
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
