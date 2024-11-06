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
import { AiOutlineSearch, AiOutlineHome, AiOutlineFolder, AiOutlineEye, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";  // Import icons
import { button } from "../ui/button";  // Custom Button component


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
          <SidebarGroupLabel><p className="pb-[10px] mt-4 space-y-4 mb-[20px] text-black font-poppins ">
          Main
        </p>
        </SidebarGroupLabel>
          <SidebarMenu>
          {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
          </SidebarGroup >
          <SidebarGroup >
          <SidebarGroupLabel><p className="pb-[10px] mt-4 space-y-4 mb-[20px] text-black font-poppins ">
          Main
        </p>
        </SidebarGroupLabel>
          <SidebarMenu>
          {topics.map((topic) => (
                <SidebarMenuItem key={topic.id}>
                  <SidebarMenuButton asChild>
                    <a href={`/topic/${topic.title}`}>
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
          {/* Home Button in footer */}
          <button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiOutlineHome size={18} className="text-black" />
          </button>
          <button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiOutlineHome size={18} className="text-black" />
          </button>
          <button className="flex-1 py-1 px-1 bg-transparent hover:bg-gray-700">
            <AiOutlineHome size={18} className="text-black" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
