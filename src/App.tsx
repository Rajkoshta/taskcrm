import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import SuperAdminRootIndex from "./pages/SuperAdminRootIndex";
import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";
import UserSection from "./pages/UserSection";
// import DepartmentDashboard from "./pages/DepartmentDashboard";
// import CustomerDashboard from "./pages/CustomerDashboard";
import SuperAdminRoot from "./layouts/SuperAdminRoot";
import DepartmentRoot from "./layouts/DepartmentRoot";
import CustomerRoot from "./layouts/CustomerRoot";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SuperAdminRootIndex />} />
            <Route path="/login" element={<Login />} />
            
            {/* Super Admin Routes */}
            <Route element={<SuperAdminRoot />}>
              <Route path="/admin" element={<SuperAdminRoot />} />
              {/* <Route path="/users" element={<UserSection />} /> */}
              {/* <Route path="/settings" element={<UserSection />} /> */}
            </Route>

            {/* Department User Routes */}
            <Route element={<DepartmentRoot />}>
              {/* <Route path="/department-dashboard" element={<DepartmentDashboard />} /> */}
              {/* <Route path="/reports" element={<DepartmentDashboard />} /> */}
              {/* <Route path="/department-settings" element={<DepartmentDashboard />} /> */}
            </Route>

            {/* Customer Routes */}
            <Route element={<CustomerRoot />}>
              {/* <Route path="/customer-dashboard" element={<CustomerDashboard />} /> */}
              {/* <Route path="/profile" element={<CustomerDashboard />} /> */}
              {/* <Route path="/orders" element={<CustomerDashboard />} /> */}
            </Route>

            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;