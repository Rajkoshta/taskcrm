import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/store/hooks";

export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
