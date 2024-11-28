"use client";

import { useEffect, useState } from "react";
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
  createdAt: string; // Date as a string since it's fetched from the API
}

export default function ContributionLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data from the backend API
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération du leaderboard : ${response.statusText}`);
        }

        const data: LeaderboardUser[] = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du leaderboard :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    // Render a loading message while data is being fetched
    return <p className="text-center font-poppins">Chargement...</p>;
  }

  if (leaderboard.length === 0) {
    // Render a fallback message if no users are found
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
            <TableHead className="py-2 text-black text-base">Username</TableHead>
            <TableHead className="py-2 text-black text-base">Contributions</TableHead>
            <TableHead className="py-2 text-black text-base">Registration Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="py-2 font-poppins">{`${index + 1}. ${user.name}`}</TableCell>
              <TableCell className="py-2 font-poppins">{user.resourcesCount}</TableCell>
              <TableCell className="py-2 font-poppins">
                {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
