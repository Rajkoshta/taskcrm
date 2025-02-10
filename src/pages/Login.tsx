import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, LogIn } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { loginUser, clearError } from "@/redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { status, error, isAuthenticated, role } = useAppSelector(
    (state) => state.auth
  );

  console.log("this is user  ")

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated && role) {
      toast({
        title: "Success",
        description: `Logged in as ${role}`,
      });

      // Corrected Role-based navigation
      switch (role) {
        case "SUPERADMIN":
          navigate("/admin");
          break;
        case "DEPARTMENT_USER":
          navigate("/emp");
          break;
        case "CUSTOMER":
          navigate("/customers");
          break;
        default:
          navigate("/");
      }
    }
  }, [isAuthenticated, role, navigate, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    await dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="text"
            placeholder="Username or Email"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button type="submit" className="w-full">
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
