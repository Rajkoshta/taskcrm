import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import { logoutUser } from "@/redux/authSlice"; // Logout action
import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  LogOut,
  UserPlus,
} from "lucide-react";

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const getNavItems = () => {
    switch (user?.role) {
      case "SUPERADMIN":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
          { icon: Users, label: "Customer List", path: "/customers" },
          { icon: UserPlus, label: "User Management", path: "/users" },
          { icon: Bell, label: "Notifications", path: "/notifications" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ];
      case "DEPARTMENT_USER":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/emp" },
          { icon: Users, label: "Customers", path: "/customers" },
          { icon: Bell, label: "Notifications", path: "/notifications" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ];
      case "CUSTOMER":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/customers" },
          { icon: Bell, label: "Notifications", path: "/notifications" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-screen">
      <div className="mb-8 px-4">
        <h1 className="text-xl font-bold text-gray-800">TSAK CRM</h1>
      </div>
      <nav className="flex-1 space-y-1">
        {getNavItems().map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 w-full"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
