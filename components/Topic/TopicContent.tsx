"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent} from "@/components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface SectionContentProps {
    page: string;
    chapters: Chapter[];
}

interface Chapter {
    id: number;
    title: string;
    description: string | null;
}

// Fonction pour corriger les éventuels échappements de \n et les transformer en <br />
function formatTextWithLineBreaks(text: string) {
    // Si le texte contient des échappements, on les remplace par de vrais sauts de ligne
    return text.replace(/\\n/g, '\n').split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
}

export default function TopicContent({ page, chapters }: SectionContentProps) {
    // Trie les chapitres par ID ou tout autre critère avant de les utiliser
    const sortedChapters = chapters.sort((a, b) => a.id - b.id);

    // Initialisation de l'onglet actif avec le premier chapitre si disponible
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        // Si la liste des chapitres est non vide, on sélectionne le premier par défaut
        if (sortedChapters.length > 0) {
            setActiveSection(sortedChapters[0].title);
        }
    }, [sortedChapters]); // Dépendance sur sortedChapters pour s'assurer de la mise à jour correcte

    return (
        <Card className="w-full max-w-4xl mx-auto border-none">
            <CardContent>
                {/* Si activeSection n'est pas vide, il sera utilisé comme valeur */}
                <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 sm:mb-8">
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
                                {/* Corriger les échappements de \n et afficher avec des <br> */}
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
