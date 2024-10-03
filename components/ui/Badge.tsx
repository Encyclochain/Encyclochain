import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority" // Importing cva for variant-based styling

import { cn } from "@/lib/utils" // Utility function to conditionally join classNames

// Defining the variants and default styles for the badge component using cva
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", // Base styles for the badge
  {
    // Variants for different badge styles
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80", // Default style: Primary background with hover effect
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80", // Secondary style: Secondary background with hover effect
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80", // Destructive style: Red background with hover effect
        outline: "text-foreground", // Outline style: No background, just text color
      },
    },
    // Default variant when none is provided
    defaultVariants: {
      variant: "default", // The default variant is "default"
    },
  }
)

// Defining the props interface for the Badge component, extending HTML div attributes
// and VariantProps for variant-based styling
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, // Basic HTML div attributes
    VariantProps<typeof badgeVariants> {} // VariantProps type for variant-specific styling

// Functional component for rendering the badge
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} /> // Applying the variant and additional classNames
  )
}

// Exporting Badge component and its variants
export { Badge, badgeVariants }
