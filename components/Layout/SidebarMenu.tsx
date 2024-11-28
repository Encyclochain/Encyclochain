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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authenticate`, {
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
        <p className="font-garamond text-black font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter text-center">
          Encyclochain
        </p>
        <div className="flex items-center justify-center bg-white mt-[10px] gap-[10px] br-[40px] p-[4px] rounded-[8px] border-solid border-2 border-[#8f96a3] outline-none">
          <AiOutlineSearch className="text-black" size={24} />
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
                    className="flex items-center space-x-1 font-poppins text-base"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {/* Contribution submenu */}
            <SidebarMenuItem className='p-2'>
              <button
                onClick={toggleSubMenu}
                className="flex items-center space-x-1"
              >
                <AiOutlineHeart />
                <span className="font-poppins text-sm">Contribution</span>
                {isOpen ? <AiOutlineDown /> : <AiOutlineRight />}
              </button>

              {isOpen && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <a href="/contribution" className="flex items-center space-x-1 font-poppins text-sm mt-2">
                      <AiOutlineFolder />
                      <span>Contribute</span>
                    </a>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <a
                      href="/contribution/history"
                      className="flex items-center space-x-1 font-poppins text-sm mt-2"
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
            <p className="pb-[10px] mt-4 space-y-4 mb-[20px] text-black font-garamond text-lg">Topics</p>
          </SidebarGroupLabel>
          <SidebarMenu>
            {topics.map((topic) => (
              <SidebarMenuItem key={topic.id}>
                <SidebarMenuButton asChild>
                  <a href={`/topic/${topic.title}`} className="flex items-center font-poppins">
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
        <div className="flex items-center p-2 ">
        <div className="w-[30px] h-[30px] relative mr-4">          <Image
            src={user.twitter?.profilePictureUrl || user.farcaster?.pfp || ""}
            alt="Profile Picture"
            width={30}
            height={30}
            className="rounded-full"
          />
                    </div>

          <div className="text-base font-poppins"> {user.farcaster?.username || user.github?.username || user.twitter?.username}</div>
          </div>
      )}
            <div className="px-4 py-2">
      <Button
        onClick={authenticated ? logout : login}
        className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-[#8f96a3] hover:bg-gray-100 text-black"
      >
         <span className="font-poppins text-sm">
          {authenticated ? 'Logout' : 'Login'}
          </span>
      </Button>
      </div>
      {/* Footer with external links */}
      <SidebarFooter className=" items-center">
        <div className={` flex-col gap-1 space-x-10 `}>
          {/* Home button in footer */}
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiOutlineDiscord size={18} className="text-black" />
          </Button>
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiOutlineX size={18} className="text-black" />
          </Button>
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiFillGithub size={18} className="text-black" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
