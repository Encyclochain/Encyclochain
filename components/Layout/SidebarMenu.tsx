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
} from "@/components/ui/sidebar"
import { AiOutlineSearch, AiOutlineHome, AiOutlineFolder, AiOutlineEye, AiOutlineDiscord ,AiOutlineX ,AiFillGithub ,AiOutlineHeart ,  AiOutlineRight, AiOutlineLeft } from "react-icons/ai";  // Import icons
import { Button } from "../ui/button";  // Custom button component


const items = [
  {
    title: "Home",
    url: "#",
    icon: AiOutlineHome,
  },
  {
    title: "Watchlist",
    url: "/watchlist",
    icon: AiOutlineEye,
  },
  {
    title: "Contribution",
    url: "#",
    icon: AiOutlineHeart,
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
          <SidebarGroupLabel><p className="pb-[10px] mt-4 space-y-4 mb-[20px] text-black font-garamond font-semibold">
          Main
        </p>
        </SidebarGroupLabel>
          <SidebarMenu>
          {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-poppins">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
          </SidebarGroup >
          <SidebarGroup >
          <SidebarGroupLabel><p className="pb-[10px] mt-4 space-y-4 mb-[20px] text-black font-garamond font-bold">
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
