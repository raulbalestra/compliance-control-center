import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/stores/AuthContext";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function PortalRoute() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "provider") return <Navigate to="/" replace />;
  return <Outlet />;
}
