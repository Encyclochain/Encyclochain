"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog" // Import Radix UI Dialog components
import { X } from "lucide-react" // Import 'X' icon for close Button
import { cn } from "@/lib/utils" // Utility function to conditionally join classNames

// Root Dialog component, wrapping the Radix Dialog Root
const Dialog = DialogPrimitive.Root

// DialogTrigger component, used to open the dialog
const DialogTrigger = DialogPrimitive.Trigger

// Portal to render dialog content outside of the DOM hierarchy
const DialogPortal = DialogPrimitive.Portal

// Close Button for the dialog
const DialogClose = DialogPrimitive.Close

// DialogOverlay component for the background overlay
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>, // Reference type for Radix's Overlay component
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> // Props type for Radix's Overlay component
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", // Overlay animation for open/close state
      className // Merge additional classNames
    )}
    {...props} // Spread additional props
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName // Display name for easier debugging

// DialogContent component to render the dialog box
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>, // Reference type for Radix's Content component
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> // Props type for Radix's Content component
>(({ className, children, ...props }, ref) => (
  <DialogPortal> {/* Render content through a portal */}
    <DialogOverlay /> {/* Render the overlay background */}
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200", // Centered dialog box styling and animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", // Animations based on state
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 sm:rounded-lg", // Different animations for different positions
        className // Merge additional classNames
      )}
      {...props} // Spread additional props
    >
      {children} {/* Render dialog content */}
      {/* Close Button inside the dialog */}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <X className="h-4 w-4" /> {/* 'X' icon for close */}
        <span className="sr-only">Close</span> {/* Screen reader text */}
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName // Display name for easier debugging

// DialogHeader component, typically for the dialog title
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left", // Flexbox for the header
      className // Merge additional classNames
    )}
    {...props} // Spread additional props
  />
)
DialogHeader.displayName = "DialogHeader"

// DialogFooter component, typically for actions like 'Cancel' or 'Submit'
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", // Flexbox for the footer, with reverse stacking on smaller screens
      className // Merge additional classNames
    )}
    {...props} // Spread additional props
  />
)
DialogFooter.displayName = "DialogFooter"

// DialogTitle component for the dialog title
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>, // Reference type for Radix's Title component
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> // Props type for Radix's Title component
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight", // Styling for the dialog title
      className // Merge additional classNames
    )}
    {...props} // Spread additional props
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName // Display name for easier debugging

// DialogDescription component for any additional dialog text
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>, // Reference type for Radix's Description component
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> // Props type for Radix's Description component
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // Styling for description text
    {...props} // Spread additional props
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName // Display name for easier debugging

// Export all components
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
