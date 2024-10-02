import * as React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditionally joining class names

// Main Card component: a wrapper div that can accept additional class names and properties
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forwarding ref to the div element
    className={cn("rounded-lg border bg-card text-card-foreground ", className)} // Default styles with conditional class name
    {...props} // Spread any additional props
  />
));
Card.displayName = "Card"; // Display name for debugging

// CardHeader component: typically used for the top section of the card
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forwarding ref to the header div
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Flexbox layout, padding, and spacing
    {...props} // Spread any additional props
  />
));
CardHeader.displayName = "CardHeader";

// CardTitle component: used for displaying the title of the card
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref} // Forwarding ref to the heading element
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)} // Font styling for the card title
    {...props} // Spread any additional props
  />
));
CardTitle.displayName = "CardTitle";

// CardDescription component: used for displaying the card's description or subtitle
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref} // Forwarding ref to the paragraph element
    className={cn("text-sm text-muted-foreground", className)} // Text styling with muted color for the description
    {...props} // Spread any additional props
  />
));
CardDescription.displayName = "CardDescription";

// CardContent component: typically used to wrap the main content of the card
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} /> // No padding on top; otherwise inherits props and className
));
CardContent.displayName = "CardContent";

// CardFooter component: typically used for the footer section of the card, such as buttons or additional links
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forwarding ref to the footer div
    className={cn("flex items-center p-6 pt-0", className)} // Flexbox layout, items centered, padding applied
    {...props} // Spread any additional props
  />
));
CardFooter.displayName = "CardFooter";

// Exporting all card-related components for usage in other parts of the app
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
