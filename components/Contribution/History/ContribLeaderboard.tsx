import prisma from "@/lib/db"; // Prisma ORM for database operations
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"; // Importing table components for display

// Typing for user contribution data
interface LeaderboardUser {
  id: number; // User ID
  name: string; // Username
  resourcesCount: number; // Number of resources contributed
  createdAt: Date; // User creation date
}

// Function to fetch leaderboard data
async function getLeaderboard(): Promise<LeaderboardUser[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true, // User ID
      name: true, // Username
      createdAt: true, // User creation date
      contributions: true, // Fetch contributions (relation)
    },
  });

  // Format and sort users by the number of contributions
  return users
    .map((user) => ({
      id: user.id,
      name: user.name || "Anonymous", // Fallback if no username
      resourcesCount: user.contributions.length, // Number of contributions
      createdAt: user.createdAt,
    }))
    .sort((a, b) => b.resourcesCount - a.resourcesCount); // Sort by contributions (descending)
}

// Leaderboard component
export default async function ContributionLeaderboard() {
  const leaderboard = await getLeaderboard(); // Fetch leaderboard data

  if (leaderboard.length === 0) {
    return <p className="text-center font-poppins">Aucun contributeur trouvé.</p>;
  }

  return (
    <div className="mt-[5%] mb-[5%] p-[50px] w-full">
      {/* Display the leaderboard title */}
      <h2 className="text-3xl font-bold text-black mb-6 lg:text-left text-center font-garamond">
        Contribution Leaderboard
      </h2>
      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 text-black text-base">Username</TableHead>
            <TableHead className="py-2 text-black text-base">Contributions</TableHead>
            <TableHead className="py-2 text-black text-base">Registration Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((user, index) => (
            <TableRow key={user.id}>
              {/* Display rank and username */}
              <TableCell className="py-2 font-poppins">{`${index + 1}. ${user.name}`}</TableCell>
              <TableCell className="py-2 font-poppins">{user.resourcesCount}</TableCell>
              <TableCell className="py-2 font-poppins">
                {user.createdAt.toLocaleDateString("fr-FR")} {/* Format date as DD/MM/YYYY */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
