import * as React from "react";

// Utility function to concatenate class names conditionally
import { cn } from "@/lib/utils";

// Table component using React's forwardRef to pass refs to the underlying DOM element
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  // Wrapper div to allow the table to scroll if its content overflows
  <div className="relative w-full overflow-auto">
    {/* The actual table element that accepts a ref and spreads any additional props */}
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)} // Combine default and passed class names
      {...props}
    />
  </div>
));
Table.displayName = "Table"; // Display name for debugging

// TableHeader component for the <thead> element
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

// TableBody component for the <tbody> element
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)} // Removes bottom border from the last row
    {...props}
  />
));
TableBody.displayName = "TableBody";

// TableFooter component for the <tfoot> element
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      // Default styles for the footer
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", 
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// TableRow component for <tr> elements
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      // Default styles for the rows, including hover effects
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// TableHead component for <th> elements (table headers)
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      // Default styles for table headers
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

// TableCell component for <td> elements (table cells)
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      // Default styles for table cells
      "p-4 align-middle [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// TableCaption component for <caption> elements
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      // Default styles for captions, often used for descriptions under tables
      "mt-4 text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// Exporting all table-related components to be used elsewhere
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
