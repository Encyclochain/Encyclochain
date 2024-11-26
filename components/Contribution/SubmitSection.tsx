'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/Input" 
import { Label } from "@/components/ui/label" 

export function SubmitSection() {
  // Local state to track form inputs.
  const [link, setLink] = useState('') // URL of the submitted section.
  const [section, setSection] = useState('') // Selected section from predefined options.
  const [newSection, setNewSection] = useState('') // User-suggested new section.
  const [category, setCategory] = useState('') // Placeholder for a category input (currently unused).
  const [newCategory, setNewCategory] = useState('') // Placeholder for a new category input (currently unused).
  const [field4, setField4] = useState('') // Placeholder for an additional field.
  const [field5, setField5] = useState('') // Placeholder for an additional field.

  // Mock data for sections to display in the dropdown.
  const sections = ['News', 'Technology', 'Sports', 'Entertainment']

  // Form submission handler.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Prevents the default form submission behavior.
    // Logs the form data to the console. Replace this with API logic to send the data to your backend.
    console.log({ 
      link, 
      section: section || newSection, // Prioritizes user input for new sections.
      category: category || newCategory, 
      field4, 
      field5 
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      {/* Input field for the URL of the section */}
      <div>
        <Label htmlFor="link">Submit a new section</Label>
        <Input
          id="link"
          type="url" // Ensures that the input expects a valid URL.
          placeholder="https://example.com"
          value={link}
          onChange={(e) => setLink(e.target.value)} // Updates the link state.
          required // Makes the field mandatory.
        />
      </div>

      {/* Section selection or suggestion */}
      <div className="grid grid-cols-2 gap-4">
        {/* Dropdown for selecting a predefined section */}
        <div>
          <Label htmlFor="section">Choose a Topic</Label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)} // Updates the selected section.
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="" disabled>
              Select a section
            </option>
            {sections.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Input field for suggesting a new section */}
        <div>
          <Label htmlFor="newSection">Or suggest a new Topic</Label>
          <Input
            id="newSection"
            placeholder="New section name"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)} // Updates the new section state.
          />
        </div>
      </div>

      {/* Submit button */}
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}
