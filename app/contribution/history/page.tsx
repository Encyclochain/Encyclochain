import ContribLeader from "@/components/Contribution/History/ContribLeaderboard"; // Importing SectionSelect component

// Defining the PageProps interface for the pag

// Function component for the Home page
export default async function Home() {
  // Decoding the page parameter to handle special characters like %20 (space)

  return (
    <main className="container mx-auto px-4 py-8"> {/* Flexbox layout to center items */}

      <ContribLeader  />
    </main>
  );
}
