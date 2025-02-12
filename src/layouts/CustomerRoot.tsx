import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/store/hooks";
import { Button } from "@/components/ui/button";
import { 
  User, 
  ShoppingCart, 
  LogOut,
  LayoutDashboard 
} from "lucide-react";
import { useAppDispatch } from "@/redux/store/hooks";
import { logout } from "@/redux/slices/authSlice";
const CustomerRoot = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated || role !== "CUSTOMER") {
      navigate("/login");
    }
  }, [isAuthenticated, role, navigate]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Customer Portal</h1>
        </div>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
            onClick={() => navigate("/customer-dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
            onClick={() => navigate("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
            onClick={() => navigate("/orders")}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Orders
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};
export default CustomerRoot;
