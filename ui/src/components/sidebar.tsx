import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/useAuthStore";

import { Upload, Map, LogOut } from "lucide-react";

import { Link } from "react-router";

const menuItems = [
  {
    title: "Upload Document",
    icon: Upload,
    href: "/upload",
  },
  {
    title: "My Itineraries",
    icon: Map,
    href: "/itineraries",
  },
];

export default function AppSidebar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Sidebar className="">
      <SidebarHeader className="flex items-center bg-sidebar justify-between px-4 py-3">
        <h2 className="font-bold text-lg">Orbitra AI</h2>
      </SidebarHeader>

      <SidebarContent className="px-1 bg-sidebar">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem className=" mt-1" key={item.title}>
              <SidebarMenuButton asChild className="bg-sidebar h-11 rounded-xl">
                <Link to={item.href}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-3 bg-sideba">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => logout()}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
