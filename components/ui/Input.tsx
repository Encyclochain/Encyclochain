import * as React from "react"

import { cn } from "@/lib/utils" // Utility function to conditionally join classNames

// Define InputProps that extend HTML's built-in input attributes
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Input component using React.forwardRef to forward the ref to the input element
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      // Render an <input> element
      <input
        type={type} // Pass the input type (e.g., text, email, etc.)
        ref={ref} // Forward the ref to the input element
        className={cn(
          // Apply utility classes for styling the input
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className // Merge with any additional className passed via props
        )}
        {...props} // Spread the remaining props (e.g., onChange, value, etc.)
      />
    )
  }
)

// Set the displayName for easier debugging and component identification
Input.displayName = "Input"

export { Input } // Export the Input component
