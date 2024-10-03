"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion"; // Importing Radix UI's Accordion primitive for accessibility and behavior
import { ChevronDown } from "lucide-react"; // ChevronDown icon for accordion toggle

import { cn } from "@/lib/utils"; // Utility function for conditionally applying class names

// Accordion root component from Radix UI
const Accordion = AccordionPrimitive.Root;

// Accordion item (individual item in the accordion list)
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>, // Reference type (Accordion item)
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> // Props that are passed without ref
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)} // Adds a bottom border to each accordion item
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem"; // Set display name for the component in debugging/dev tools

// Accordion trigger (the clickable element to open/close accordion items)
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>, // Reference type (Accordion trigger)
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> // Props that are passed without ref
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex"> {/* Header wraps the trigger */}
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // Styling for the trigger, including hover and transition effects
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children} {/* Accordion label or content inside the trigger */}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> {/* Chevron icon that rotates when open */}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName; // Set display name for easier debugging

// Accordion content (the content that gets revealed when the trigger is clicked)
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>, // Reference type (Accordion content)
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> // Props that are passed without ref
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" // Animations for open/close
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div> {/* Content wrapped with padding */}
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName; // Set display name for easier debugging

// Exporting all components (Accordion, AccordionItem, AccordionTrigger, AccordionContent)
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
