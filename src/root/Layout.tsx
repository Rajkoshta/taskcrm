console.log("this is layout")
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Sidebar from "./Sidebar";
import SuperAdminRoot from "@/pages/superadmin/SuperAdminRoot";
import CustomerRoot from "@/pages/customer/CustomerRoot";
import UserDepartment from "@/pages/userDepartment/UserDepartment";
import UserManagement from "@/pages/superadmin/components/userManagement/UserManagement";
import CustomerManagement from "@/pages/superadmin/components/CustomerSection/CustomerManagement";


export default function Layout() {
  const user = useSelector((state: RootState) => state.auth.user);
const isLoading = useSelector((state: RootState) => state.auth.status === "loading");


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
          <Route path="/manage-user" element={<UserManagement /> } />
          <Route path="/manage-customers" element={<CustomerManagement/>} />
          <Route path="/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
}
