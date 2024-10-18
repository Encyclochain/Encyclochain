"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Bitcoin } from 'lucide-react'

interface SectionContentProps {
    page: string
}

const sectionContent = {
    presentation: (
        <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Présentation</h2>
            <p className="text-sm md:text-base">
                Bitcoin s'appuie sur un logiciel pour créer et gérer les bitcoins. Dans ce logiciel, les bitcoins sont créés conformément à un consensus appelé Preuve de travail ou simplement POW, qui rétribue les agents (appelés « mineurs ») qui ont traité des transactions. Ces agents cherchent à contribuer leur puissance de calcul informatique afin de vérifier, de sécuriser et d'inscrire les transactions dans un registre virtuel.
            </p>
        </div>
    ),
    histoire: (
        <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Histoire</h2>
            <p className="text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
            </p>
        </div>
    ),
    conception: (
        <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Conception</h2>
            <p className="text-sm md:text-base">
                Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
            </p>
        </div>
    ),
    fonctionnement: (
        <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Fonctionnement</h2>
            <p className="text-sm md:text-base">
                Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula.
            </p>
        </div>
    ),
}

export default function Component({ page }: SectionContentProps) {
    const [activeSection, setActiveSection] = useState('presentation')

    return (
        <Card className="w-full max-w-4xl mx-auto border-none">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
                <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                    <Bitcoin className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                    {page}
                </CardTitle>
                <span className="text-orange-500 font-semibold text-base sm:text-lg">13% +blablabla</span>
            </CardHeader>
            <CardContent>
                <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 sm:mb-8">
                        {Object.keys(sectionContent).map((section) => (
                            <TabsTrigger key={section} value={section} className="capitalize text-xs sm:text-sm max-md:bg-[#64748b] max-md:bg-opacity-10">
                                {section}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {Object.entries(sectionContent).map(([key, content]) => (
                        <TabsContent key={key} value={key}>
                            {content}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}
