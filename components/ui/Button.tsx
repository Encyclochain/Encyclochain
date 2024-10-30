import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Importing Slot from Radix UI, which allows for flexible component composition.
import { cva, type VariantProps } from "class-variance-authority"; // `cva` is used to manage conditional class names. `VariantProps` helps type the variants.
import { cn } from "@/lib/utils"; // Utility function for conditionally joining class names.

// Define Button variants with conditional class names.
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    // Variant definitions
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // Default Button style
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Destructive style (e.g., for delete actions)
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Outlined Button style
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Secondary Button style
        ghost: "hover:bg-accent hover:text-accent-foreground", // Ghost Button with transparent background
        link: "text-primary underline-offset-4 hover:underline", // Link-style Button
      },
      size: {
        default: "h-10 px-4 py-2", // Default size for the Button
        sm: "h-9 rounded-md px-3", // Small size
        lg: "h-11 rounded-md px-8", // Large size
        icon: "h-10 w-10", // Icon-only Button style
      },
    },
    // Default variants when none are provided
    defaultVariants: {
      variant: "default", // Default Button style
      size: "default", // Default size
    },
  }
);

// ButtonProps interface to define the allowed props for the Button component.
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Extends HTML Button attributes
    VariantProps<typeof buttonVariants> { // Adds support for the variants defined in `buttonVariants`.
  asChild?: boolean; // Option to render the Button as a child of another component (using Radix Slot)
}

// Button component definition using forwardRef to support ref forwarding
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"; // If `asChild` is true, use Radix Slot. Otherwise, render a <Button>.
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Combine conditional class names based on variant and size
        ref={ref} // Forward the ref to the underlying Button or Slot component
        {...props} // Spread any additional props to the Button
      />
    );
  }
);
Button.displayName = "Button"; // Set the display name for debugging purposes

export { Button, buttonVariants }; // Export the Button component and the buttonVariants function
