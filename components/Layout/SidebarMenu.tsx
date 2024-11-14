"use client"

import { useState } from 'react'
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
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { AiOutlineSearch, AiOutlineHome, AiOutlineFolder, AiOutlineEye, AiOutlineDiscord ,AiOutlineX ,AiFillGithub ,AiOutlineHeart ,  AiOutlineRight, AiOutlineLeft, AiOutlineDown } from "react-icons/ai";  // Import icons
import { Button } from "../ui/button";  // Custom button component


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
]

interface topic {
  id: number;
  title: string;
}

// Typing for the props of the SidebarMenu component
interface SidebarMenuProps {
  topics: topic[];  // Array of section types passed from the server component
}




export function AppSidebar({ topics }: SidebarMenuProps) {

  const [isOpen, setIsOpen] = useState(false);

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
          {
            <input type="text" className="bg-transparent outline-none" placeholder="Search..." />  
          }
        </div>
      </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
          <SidebarMenu>
          {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-1 font-poppins text-base">
                      <item.icon />
                      <span >{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem className='p-2'>
                <button onClick={toggleSubMenu} className="flex items-center space-x-1">
                  <AiOutlineHeart />
                  <span className="font-poppins text-sm">Contribution</span>
                  {isOpen ? (
            <AiOutlineDown />
          ) : (
            <AiOutlineRight />
          )}
                </button>

                {isOpen && (
                  <div className="ml-2">
                    <SidebarMenuSub>
                      <SidebarMenuSubItem />
                      <a href={`/contribution`}  className="flex items-center space-x-1 font-poppins text-sm mt-2" >
                        <AiOutlineFolder  />
                        <span>Contribute</span>
                      </a>
                    </SidebarMenuSub>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem />
                      <a href={`/contribution`}  className="flex items-center space-x-1 font-poppins text-sm mt-2" >
                        <AiOutlineFolder />
                        <span>History</span>
                      </a>
                    </SidebarMenuSub>
                  </div>
                  
                )}
              </SidebarMenuItem>
          </SidebarMenu>
          </SidebarGroup >
          <SidebarGroup >
          <SidebarGroupLabel><p className="pb-[10px] mt-4 space-y-4 mb-[20px] text-black font-garamond text-lg">
          Topics
        </p>
        </SidebarGroupLabel>
          <SidebarMenu>
          {topics.map((topic) => (
                <SidebarMenuItem key={topic.id}>
                  <SidebarMenuButton asChild>
                    <a href={`/topic/${topic.title}`} className="font-poppins">
                    <AiOutlineFolder size={24} />
                      <span>{topic.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

          </SidebarMenu>
          </SidebarGroup >
      </SidebarContent>
      <SidebarFooter className=" items-center">
      <div className={` flex-col gap-1 space-x-10 `}>
          {/* Home button in footer */}
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiOutlineDiscord size={18} className="text-black" />
          </Button>
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiOutlineX  size={18} className="text-black" />
          </Button>
          <Button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiFillGithub size={18} className="text-black" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
