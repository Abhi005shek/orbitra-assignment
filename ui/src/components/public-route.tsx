import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/upload" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
