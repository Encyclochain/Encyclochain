'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"
import { Plus } from 'lucide-react'
import SubmitResource from './SubmitRessources'

interface SubmitResourceModalProps {
    categoryId: number
    categoryTitle: string
    sectionTitle: string
}

export default function SubmitResourceModal({
    categoryId,
    categoryTitle,
    sectionTitle
}: SubmitResourceModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Plus size={16} />
                    Add resource
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add resource to {categoryTitle}</DialogTitle>
                    <DialogDescription>
                        Add a new resource to the category {categoryTitle} in section {sectionTitle}
                    </DialogDescription>
                </DialogHeader>
                <SubmitResource
                    preselectedCategory={categoryId}
                    preselectedSection={sectionTitle}
                />
            </DialogContent>
        </Dialog>
    )
} 