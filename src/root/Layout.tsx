console.log("this is layout");
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Sidebar from "./Sidebar";
import SuperAdminRoot from "@/pages/superadmin/components/DashboradSection/SuperAdminRoot";
import CustomerRoot from "@/pages/customer/CustomerRoot";
import UserDepartment from "@/pages/userDepartment/UserDepartment";
import UserManagement from "@/pages/superadmin/components/DepartmentUserSection/DepartmentTable";
import CustomerDetails from "@/pages/superadmin/components/CustomerSection/components/CustomerDetails";
import CustomerManagement from "@/pages/superadmin/components/CustomerSection/CustomerManagement";
import { CustomerTablesForUserDepartment } from "@/pages/userDepartment/CustomerTablesForUserDepartment";

export default function Layout() {
  const user = useSelector((state: RootState) => state.auth.user);
  // console.log("this is login user", user)
  const isLoading = useSelector(
    (state: RootState) => state.auth.status === "loading"
  );
  const userRole = user?.role || "guest";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Routes>
          <Route path="/admin" element={<SuperAdminRoot />} />
          <Route path="/customers" element={<CustomerRoot />} />
          <Route path="/emp" element={<UserDepartment />} />
          <Route path="/manage-user" element={<UserManagement />} />
          <Route path="/manage-customers" element={<CustomerManagement />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
          <Route
            path="/manage-customer-emp"
            element={<CustomerTablesForUserDepartment />}
          />

          <Route
            path="/*"
            element={
              userRole === "SUPERADMIN" ? (
                <Navigate to="/admin" replace />
              ) : userRole === "DEPARTMENT_USER" ? ( 
                <Navigate to="/manage-customer-emp" replace />
              ) : userRole === "CUSTOMER" ? (
                <Navigate to="/customer-dashboard" replace />
              ) : (
                <Navigate to="/login" replace /> 
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}
