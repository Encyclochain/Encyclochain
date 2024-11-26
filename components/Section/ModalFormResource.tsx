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

// Validation schema using Zod
const formSchema = z.object({
  link: z.string().url({ message: "Please enter a valid URL" }), // Ensures the input is a valid URL.
});

type FormValues = z.infer<typeof formSchema>; // Infers the TypeScript type from the validation schema.

interface SubmitResourceProps {
  preselectedCategory: number; // Preselected category ID to associate the resource.
  preselectedSection: string;  // Preselected section title for the resource.
}

export default function ModalFormResource({
  preselectedCategory,
  preselectedSection,
}: SubmitResourceProps) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks the submission state.

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // Integrates the Zod schema for validation.
    defaultValues: {
      link: "", // Initializes the form with an empty link field.
    },
  });

  // Handles form submission
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true); // Starts the loading state.

    try {
      // Sends a POST request to the server to add the resource.
      const response = await fetch('http://localhost:3000/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: values.link, // User-provided link.
          sectionTitle: preselectedSection, // Associated section title.
          categoryId: preselectedCategory, // Associated category ID.
        }),
      });

      if (!response.ok) {
        // Handles errors returned by the server.
        const errorData = await response.json();
        console.error('Submission error:', errorData.message);
        alert('Error: ' + errorData.message);
      } else {
        // Successful submission
        const data = await response.json();
        alert('Resource added successfully!');
        console.log('Resource added:', data);
        form.reset(); // Resets the form after successful submission.
      }
    } catch (error) {
      // Handles network errors.
      console.error('Network error:', error);
      alert('Error connecting to the server.');
    } finally {
      setIsSubmitting(false); // Stops the loading state.
    }
  }

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      {/* Wrapper for the form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Input field for the link */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Submit a link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    {...field} // Binds the input field to the form state.
                    disabled={isSubmitting} // Disables input during submission.
                  />
                </FormControl>
                <FormMessage /> {/* Displays validation messages */}
              </FormItem>
            )}
          />
          {/* Submit button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'} {/* Changes text during loading */}
          </Button>
        </form>
      </Form>
    </div>
  );
}
