import "./globals.css"; // Global CSS file
import type { Metadata } from "next"; // Import Metadata type for Next.js

import Sidebar from "@/components/Layout/SidebarMenu"; // Sidebar component for layout
import prisma from "@/lib/db"; // Importing Prisma client to fetch data

// Metadata configuration for the page
export const metadata: Metadata = {
  title: "Encyclochain", // Page title
  description: "Generated by create next app", // Page description
};

// Function to fetch topics using Prisma
async function gettopics() {
  try {
    // Fetching topics from the database
    const topics = await prisma.Topic.findMany({
      select: {
        id: true, // Selecting the 'id' field
        title: true, // Selecting the 'title' field
      },
    });
    return topics; // Return the fetched topics
  } catch (error) {
    console.error("Error fetching section types:", error); // Error handling
    return []; // Return an empty array if there's an error
  }
}

// Mark RootLayout as async to support data fetching
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode; // Expecting `children` as React nodes
}) {
  const topics = await gettopics(); // Fetch topics data from Prisma

  return (
    <html lang="fr"> {/* Set the language of the page to French */}
      <body className="h-screen flex overflow-hidden"> {/* Full height layout, flexbox for Sidebar and content */}
        {/* Sidebar always visible, passing fetched topics as props */}
        <Sidebar topics={topics} /> 
        
        <div className="flex-1 flex flex-col overflow-y-auto"> {/* Main content area, scrollable */}
          {/* Render child components */}
          {children}
        </div>
      </body>
    </html>
  );
}
