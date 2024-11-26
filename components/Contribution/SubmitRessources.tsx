'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod" 
import { useForm } from "react-hook-form" 
import * as z from "zod" // Used for defining a validation schema.
import { Button } from "@/components/ui/button" 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form" 
import { Input } from "@/components/ui/Input" 

// Validation schema for form fields using Zod.
const formSchema = z.object({
  link: z.string().url({ message: "Please enter a valid URL" }), // Ensures the input is a valid URL.
  section: z.string().min(1, { message: "Please select a section" }), // Validates that a section is selected.
  newSection: z.string().optional(), // Optional field for suggesting a new section.
  category: z.string().min(1, { message: "Please select a category" }), // Validates that a category is selected.
  newCategory: z.string().optional(), // Optional field for suggesting a new category.
  field4: z.string().optional(), // Placeholder optional field.
  field5: z.string().optional(), // Placeholder optional field.
})

// Type inference for form values from the schema.
type FormValues = z.infer<typeof formSchema>

// Predefined sections available for selection.
const sections = ['News', 'Technology', 'Sports', 'Entertainment']

// Props for optional preselected category or section.
interface SubmitResourceProps {
  preselectedCategory?: number 
  preselectedSection?: string 
}

export default function SubmitResource({
  preselectedCategory,
  preselectedSection
}: SubmitResourceProps) {
  // State to track the currently selected section.
  const [selectedSection, setSelectedSection] = useState(preselectedSection || '')

  // React Hook Form setup with default values and Zod validation.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "", // Default value for the link field.
      section: preselectedSection || "", // Uses preselected section if available.
      newSection: "", // Default value for the new section field.
      category: preselectedCategory?.toString() || "", // Uses preselected category if available.
      newCategory: "", // Default value for the new category field.
      field4: "", // Placeholder default.
      field5: "", // Placeholder default.
    },
  })

  // Handles form submission and logs the form values.
  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Input field for submitting a link */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Submit a link</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage /> {/* Displays validation error if the link is invalid */}
              </FormItem>
            )}
          />

          {/* Section selection or suggestion */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a section</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value) // Updates form value.
                        setSelectedSection(e.target.value) // Updates local state.
                      }}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="" disabled>Select a section</option>
                      {sections.map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage /> {/* Displays validation error if no section is selected */}
                </FormItem>
              )}
            />

            {/* Input field for suggesting a new section */}
            <FormField
              control={form.control}
              name="newSection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Or suggest a new section</FormLabel>
                  <FormControl>
                    <Input placeholder="New section name" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Displays validation error if needed */}
                </FormItem>
              )}
            />
          </div>

          {/* Category selection or suggestion */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="" disabled>Select a category</option>
                      {/* Dynamically populate categories based on the selected section */}
                      {sections.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage /> {/* Displays validation error if no category is selected */}
                </FormItem>
              )}
            />

            {/* Input field for suggesting a new category */}
            <FormField
              control={form.control}
              name="newCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Or suggest a new category</FormLabel>
                  <FormControl>
                    <Input placeholder="New category name" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Displays validation error if needed */}
                </FormItem>
              )}
            />
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
