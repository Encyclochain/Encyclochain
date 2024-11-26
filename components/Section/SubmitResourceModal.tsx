'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import ModalFormResource from '@/components/Section/ModalFormResource'

interface SubmitResourceModalProps {
    categoryId: number // The ID of the category where the resource will be added.
    categoryTitle: string // The title of the selected category.
    sectionTitle: string // The title of the section the category belongs to.
}

export default function SubmitResourceModal({
    categoryId,
    categoryTitle,
    sectionTitle
}: SubmitResourceModalProps) {
    return (
        <Dialog>
            {/* Trigger to open the modal */}
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Plus size={16} /> {/* Icon for the "Add resource" button */}
                    Add resource
                </Button>
            </DialogTrigger>
            {/* Modal content */}
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    {/* Modal title and description */}
                    <DialogTitle>Add resource to {categoryTitle}</DialogTitle>
                    <DialogDescription>
                        Add a new resource to the category {categoryTitle} in section {sectionTitle}
                    </DialogDescription>
                </DialogHeader>
                {/* Form to submit a resource */}
                <ModalFormResource
                    preselectedCategory={categoryId} // Passes preselected category ID to the form.
                    preselectedSection={sectionTitle} // Passes preselected section title to the form.
                />
            </DialogContent>
        </Dialog>
    )
}
