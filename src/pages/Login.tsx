
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Lock, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate credentials against a backend
    // For demo purposes, we'll use hardcoded values
    if (formData.email === "admin@example.com" && formData.password === "admin") {
      localStorage.setItem("userRole", "Admin");
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Success",
        description: "Logged in as Admin",
      });
      navigate("/user-section");
    } else if (formData.email === "user@example.com" && formData.password === "user") {
      localStorage.setItem("userRole", "User");
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Success",
        description: "Logged in as User",
      });
      navigate("/customer-list");
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p>Admin: admin@example.com / admin</p>
          <p>User: user@example.com / user</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
