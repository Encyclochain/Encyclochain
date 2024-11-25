'use client';

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input";

// Schéma de validation
const formSchema = z.object({
  link: z.string().url({ message: "Please enter a valid URL" }),
});

type FormValues = z.infer<typeof formSchema>;

interface SubmitResourceProps {
  preselectedCategory: number; // ID de la catégorie présélectionnée
  preselectedSection: string;  // Nom de la section présélectionnée
}

export default function ModalFormResource({
  preselectedCategory,
  preselectedSection,
}: SubmitResourceProps) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Gère l'état de chargement
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  });

  // Fonction pour gérer la soumission
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true); // Indique que le formulaire est en cours de soumission

    try {
      const response = await fetch('http://localhost:3000/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: values.link,
          sectionTitle: preselectedSection,
          categoryId: preselectedCategory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur lors de la soumission :', errorData.message);
        alert('Erreur : ' + errorData.message);
      } else {
        const data = await response.json();
        alert('Ressource ajoutée avec succès !');
        console.log('Ressource ajoutée :', data);
        form.reset(); // Réinitialise le formulaire après succès
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      alert('Erreur lors de la connexion au serveur.');
    } finally {
      setIsSubmitting(false); // Arrête le spinner de chargement
    }
  }

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Submit a link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
