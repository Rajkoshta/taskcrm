import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/store/hooks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Settings, 
  LogOut,
  LayoutDashboard 
} from "lucide-react";
import { useAppDispatch } from "@/redux/store/hooks";
import { logout } from "@/redux/slices/authSlice";
import Sidebar from "@/components/Sidebar";
const SuperAdminRoot = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated || role !== "SUPERADMIN") {
      navigate("/login");
    }
  }, [isAuthenticated, role, navigate]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex">
     <Sidebar/>
    </div>
  );
};
export default SuperAdminRoot;