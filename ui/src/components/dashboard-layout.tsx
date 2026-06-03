import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";
import AppSidebar from "./sidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import User from "./user";
import { ThemeToggle } from "./theme-toggle";

function DashboardLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen">
      <SidebarProvider>
        <AppSidebar />

        <div className="w-full h-full relative">
          <div className="h-12 bg-sidebar sticky top-0 w-full p-2 flex justify-between items-center">
            <SidebarTrigger size="icon-lg" />
            <div className="flex gap-2 items-center">
              <ThemeToggle />
              <User user={user} />
            </div>
          </div>

          <main className="h-full w-full p-2">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;
