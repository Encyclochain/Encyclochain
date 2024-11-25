"use client"

import { useEffect, useState } from 'react';
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
} from "react-icons/ai"; // Import icons
import { Button } from "../ui/button"; // Custom button component
import { usePrivy } from '@privy-io/react-auth';
import Image from "next/image"; // Import Image component from Next.js

const items = [
  {
    title: "Home",
    url: "/",
    icon: AiOutlineHome,
  },
  {
    title: "Watchlist",
    url: "/watchlist",
    icon: AiOutlineEye,
  },
];

interface Topic {
  id: number;
  title: string;
}

// Typing for the props of the SidebarMenu component
interface SidebarMenuProps {
  topics: Topic[]; // Array of section types passed from the server component
}

export function AppSidebar({ topics }: SidebarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { login, logout, user, authenticated } = usePrivy();
  const [userProcessed, setUserProcessed] = useState(false);

  useEffect(() => {
    if (authenticated && user && !userProcessed) {
      handleUserAuthenticated();
      setUserProcessed(true);
    }
  }, [authenticated, user, userProcessed]);
console.log(authenticated)
const handleUserAuthenticated = async () => {
  // Récupérer les données utilisateur

  const userId = user?.id;
  const username =
    user?.farcaster?.username ||
    user?.github?.username ||
    user?.twitter?.username ||
    null;

  // Vérifiez que les données sont valides
  if (!userId || !username) {
    console.error("Unable to retrieve user ID or username.");
    console.log("User data :", user);
    return;
  }

  // Préparer les données
  const userData = {
    privyUserId: userId,
    name: username,
  };

  console.log("Données envoyées à l'API :", userData);

  try {
    // Envoyer la requête
    const response = await fetch("http://localhost:3000/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    // Vérifier la réponse
    if (!response.ok) {
      console.error("Erreur de l'API :", data.message || "Erreur inconnue");
    } else {
      console.log("Utilisateur authentifié avec succès :", data.user);
    }
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
  }
};


  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <p className="font-garamond text-black font-serif text-3xl font-medium normal-case not-italic no-underline leading-tight tracking-tighter text-center">
          Encyclochain
        </p>
        <div className="flex items-center justify-center bg-white mt-[10px] gap-[10px] br-[40px] p-[4px] rounded-[8px] border-solid border-2 border-[#8f96a3] outline-none">
          <AiOutlineSearch className="text-black" size={24} />
          <input
            type="text"
            className="bg-transparent outline-none"
            placeholder="Search..."
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className="flex items-center space-x-1 font-poppins text-base text-black"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem className="p-2">
              <button onClick={toggleSubMenu} className="flex items-center space-x-1">
                <AiOutlineHeart />
                <span className="font-poppins text-sm text-black">Contribution</span>
                {isOpen ? <AiOutlineDown /> : <AiOutlineRight />}
              </button>

              {isOpen && (
                <div className="ml-2">
                  <SidebarMenuSub>
                    <SidebarMenuSubItem />
                    <a
                      href={`/contribution`}
                      className="flex items-center space-x-1 font-poppins text-sm mt-2"
                    >
                      <AiOutlineFolder />
                      <span>Contribute</span>
                    </a>
                  </SidebarMenuSub>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem />
                    <a
                      href={`/contribution/history`}
                      className="flex items-center space-x-1 font-poppins text-sm mt-2"
                    >
                      <AiOutlineFolder />
                      <span>History</span>
                    </a>
                  </SidebarMenuSub>
                </div>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <p className="pb-[10px] mt-4 space-y-4 mb-[20px] text-black font-garamond text-lg">
              Topics
            </p>
          </SidebarGroupLabel>
          <SidebarMenu>
            {topics.map((topic) => (
              <SidebarMenuItem key={topic.id}>
                <SidebarMenuButton asChild>
                  <a
                    href={`/topic/${topic.title}`}
                    className="font-poppins text-black text-sm"
                  >
                    <AiOutlineFolder size={24} />
                    <span>{topic.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {authenticated && user && (
        <div className="flex items-center p-2">
          <div className="w-[30px] h-[30px] relative mr-4">
            <Image
              src={
                user.twitter?.profilePictureUrl ||
                user.farcaster?.pfp ||
                ""
              }
              alt="Logo"
              width={100}
              height={100}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
          <div className="text-base font-poppins">
            {user.farcaster?.username ||
              user.github?.username ||
              user.twitter?.username}
          </div>
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
      <SidebarFooter className="items-center">
        <div className="flex-col gap-1 space-x-10">
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
