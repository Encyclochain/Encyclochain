"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineFolder,
  AiOutlineEye,
  AiOutlineDiscord,
  AiOutlineX,
  AiFillGithub,
  AiOutlineHeart,
  AiOutlineRight,
  AiOutlineDown,
} from "react-icons/ai"; // Icons for menu items.
import { Button } from "../ui/button"; // Custom button component.
import { usePrivy } from "@privy-io/react-auth"; // Handles authentication.
import Image from "next/image"; // Image component for user profile pictures.

const items = [
  { title: "Home", url: "/", icon: AiOutlineHome },
  { title: "Watchlist", url: "/watchlist", icon: AiOutlineEye },
];

interface Topic {
  id: number; // Unique identifier for the topic.
  title: string; // Title of the topic.
}

interface SidebarMenuProps {
  topics: Topic[]; // List of topics to display in the sidebar.
}

export function AppSidebar({ topics }: SidebarMenuProps) {
  const [isOpen, setIsOpen] = useState(false); // Tracks the state of the Contribution submenu.
  const { login, logout, user, authenticated } = usePrivy(); // Privy authentication hooks.
  const [userProcessed, setUserProcessed] = useState(false);

  useEffect(() => {
    // Runs when the user is authenticated and processes user data.
    if (authenticated && user && !userProcessed) {
      handleUserAuthenticated();
      setUserProcessed(true);
    }
  }, [authenticated, user, userProcessed]);

  const handleUserAuthenticated = async () => {
    // Fetches and processes authenticated user data, then sends it to the API.
    const userId = user?.id;
    const username =
      user?.farcaster?.username ||
      user?.github?.username ||
      user?.twitter?.username ||
      null;

    if (!userId || !username) {
      console.error("Unable to retrieve user ID or username.");
      console.log("User data:", user);
      return;
    }

    const userData = { privyUserId: userId, name: username };

    try {
      const response = await fetch("http://localhost:3000/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("API Error:", data.message || "Unknown error");
      } else {
        const data = await response.json();
        console.log("User authenticated successfully:", data.user);
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const toggleSubMenu = () => {
    setIsOpen(!isOpen); // Toggles the Contribution submenu visibility.
  };

  return (
    <Sidebar>
      {/* Header with a search bar */}
      <SidebarHeader>
        <p className="font-garamond text-black text-3xl text-center">
          Encyclochain
        </p>
        <div className="flex items-center justify-center mt-2 p-2 rounded border">
          <AiOutlineSearch size={24} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main navigation menu */}
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className="flex items-center space-x-2 text-black"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {/* Contribution submenu */}
            <SidebarMenuItem>
              <button
                onClick={toggleSubMenu}
                className="flex items-center space-x-2"
              >
                <AiOutlineHeart />
                <span>Contribution</span>
                {isOpen ? <AiOutlineDown /> : <AiOutlineRight />}
              </button>

              {isOpen && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <a href="/contribution" className="flex items-center mt-2">
                      <AiOutlineFolder />
                      <span>Contribute</span>
                    </a>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <a
                      href="/contribution/history"
                      className="flex items-center mt-2"
                    >
                      <AiOutlineFolder />
                      <span>History</span>
                    </a>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Topics section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <p className="text-lg">Topics</p>
          </SidebarGroupLabel>
          <SidebarMenu>
            {topics.map((topic) => (
              <SidebarMenuItem key={topic.id}>
                <SidebarMenuButton asChild>
                  <a href={`/topic/${topic.title}`} className="flex items-center">
                    <AiOutlineFolder />
                    <span>{topic.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* User profile and login/logout button */}
      {authenticated && user && (
        <div className="flex items-center p-2">
          <Image
            src={user.twitter?.profilePictureUrl || user.farcaster?.pfp || ""}
            alt="Profile Picture"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="ml-2">{user.farcaster?.username}</span>
        </div>
      )}
      <Button
        onClick={authenticated ? logout : login}
        className="w-full mt-4"
      >
        {authenticated ? "Logout" : "Login"}
      </Button>

      {/* Footer with external links */}
      <SidebarFooter>
        <Button>
          <AiOutlineDiscord />
        </Button>
        <Button>
          <AiOutlineX />
        </Button>
        <Button>
          <AiFillGithub />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
