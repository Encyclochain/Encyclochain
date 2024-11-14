'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export function SubmitSection() {
  const [link, setLink] = useState('')
  const [section, setSection] = useState('')
  const [newSection, setNewSection] = useState('')
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [field4, setField4] = useState('')
  const [field5, setField5] = useState('')

  // Mock data for sections and categories
  const sections = ['News', 'Technology', 'Sports', 'Entertainment']
  const categories = {
    'News': ['World', 'Local', 'Politics'],
    'Technology': ['Gadgets', 'Software', 'AI'],
    'Sports': ['Football', 'Basketball', 'Tennis'],
    'Entertainment': ['Movies', 'Music', 'TV Shows']
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log({ link, section: section || newSection, category: category || newCategory, field4, field5 })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <div>
        <Label htmlFor="link">Submit a new section</Label>
        <Input
          id="link"
          type="url"
          placeholder="https://example.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="section">Choose a Topic</Label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
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

        <div>
          <Label htmlFor="newSection">Or suggest a new Topic</Label>
          <Input
            id="newSection"
            placeholder="New section name"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  )
}