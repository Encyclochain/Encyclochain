import prisma from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

// Typing for user data in the leaderboard
interface LeaderboardUser {
  id: number; 
  name: string; 
  resourcesCount: number; 
  createdAt: Date; 
}

// Fetches and formats leaderboard data from the database
async function getLeaderboard(): Promise<LeaderboardUser[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      contributions: true, // Relation that links users to their contributions
    },
  });

  return users
    .map((user) => ({
      id: user.id,
      name: user.name || "Anonymous", // Defaults to "Anonymous" if no username is provided
      resourcesCount: user.contributions.length, // Counts the number of contributions
      createdAt: user.createdAt,
    }))
    .sort((a, b) => b.resourcesCount - a.resourcesCount); // Sorts users by contributions (descending)
}

// Main component to display the contribution leaderboard
export default async function ContributionLeaderboard() {
  const leaderboard = await getLeaderboard(); // Retrieves formatted leaderboard data

  if (leaderboard.length === 0) {
    // Renders a fallback message if no users are found
    return <p className="text-center font-poppins">Aucun contributeur trouvé.</p>;
  }

  return (
    <div className="mt-[5%] mb-[5%] p-[50px] w-full">
      <h2 className="text-3xl font-bold text-black mb-6 lg:text-left text-center font-garamond">
        Contribution Leaderboard
      </h2>
      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            {/* Column headers for the table */}
            <TableHead className="py-2 text-black text-base">Username</TableHead>
            <TableHead className="py-2 text-black text-base">Contributions</TableHead>
            <TableHead className="py-2 text-black text-base">Registration Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((user, index) => (
            <TableRow key={user.id}>
              {/* Displays the user's rank and name */}
              <TableCell className="py-2 font-poppins">{`${index + 1}. ${user.name}`}</TableCell>
              {/* Displays the number of contributions */}
              <TableCell className="py-2 font-poppins">{user.resourcesCount}</TableCell>
              {/* Formats and displays the registration date */}
              <TableCell className="py-2 font-poppins">
                {user.createdAt.toLocaleDateString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
