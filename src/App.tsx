import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import Login from "./pages/Login";
import Layout from "./root/Layout";


  
const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Layout />} />
          </Routes>
        </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
</Provider>
);

export default App;