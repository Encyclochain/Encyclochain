'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"

const formSchema = z.object({
  link: z.string().url({ message: "Please enter a valid URL" }),
  section: z.string().min(1, { message: "Please select a section" }),
  newSection: z.string().optional(),
  category: z.string().min(1, { message: "Please select a category" }),
  newCategory: z.string().optional(),
  field4: z.string().optional(),
  field5: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const sections = ['News', 'Technology', 'Sports', 'Entertainment']
const categories = {
  'News': ['World', 'Local', 'Politics'],
  'Technology': ['Gadgets', 'Software', 'AI'],
  'Sports': ['Football', 'Basketball', 'Tennis'],
  'Entertainment': ['Movies', 'Music', 'TV Shows']
}

export default function SubmitResource() {
  const [selectedSection, setSelectedSection] = useState('')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
      section: "",
      newSection: "",
      category: "",
      newCategory: "",
      field4: "",
      field5: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
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
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                      field.onChange(e.target.value)
                      setSelectedSection(e.target.value)
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
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="newSection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Or suggest a new section</FormLabel>
                  <FormControl>
                    <Input placeholder="New section name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
       </div>

       <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose a category</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setSelectedSection(e.target.value)
                    }}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="" disabled>Select a category</option>
                    {sections.map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="newSection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Or suggest a new category</FormLabel>
                  <FormControl>
                    <Input placeholder="New category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
       </div>
       
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
    </div>
  )
}
