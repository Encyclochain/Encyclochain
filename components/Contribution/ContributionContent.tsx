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

export function ContributionContent() {
  // Contenu des chapitres écrit directement dans le code
  const chapters = [
    {
      id: 1,
      title: "Contribute",
      description: "Bitcoin is a decentralized digital currency created in 2009 by an anonymous individual or group known as Satoshi Nakamoto.\\nUnlike traditional currencies, Bitcoin is not controlled by any central authority, such as a government or bank. Instead, it operates on a peer-to-peer network that allows users to send and receive payments directly without intermediaries."
    },
    {
      id: 2,
      title: "Statistics",
      description: "The concept of Bitcoin was first introduced in 2008 when Satoshi Nakamoto published the whitepaper titled 'Bitcoin: A Peer-to-Peer Electronic Cash System'.\\nIn January 2009, Nakamoto mined the Genesis Block, the first block on the Bitcoin blockchain, marking the launch of the network."
    },
  ];

  // Trie les chapitres par ID et initialise l'onglet actif avec le premier chapitre
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
              <TabsTrigger key={chapter.id} value={chapter.title} className="capitalize text-xs sm:text-sm max-md:bg-[#64748b] max-md:bg-opacity-10 font-garamond">
                {chapter.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {sortedChapters.map((chapter) => (
            <TabsContent key={chapter.id} value={chapter.title}>
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold font-garamond">{chapter.title}</h2>
                <p className="text-sm md:text-base font-poppins">
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
