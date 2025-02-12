
import { useState } from "react";
import { Department, DepartmentType } from "@/types/department";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DepartmentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (department: Partial<Department>) => void;
  initialData?: Department;
}

export function DepartmentForm({ open, onClose, onSubmit, initialData }: DepartmentFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Department>>(
    initialData || {
      username: "",
      email: "",
      password: "",
      departmentType: "CREATIVE_DEPARMENT",
      role: "DEPARTMENT_USER",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email || (!initialData && !formData.password)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Department" : "Add New Department"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              placeholder="username@mbg"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="email@mbg.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {initialData ? "New Password (optional)" : "Password"}
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Department Type</label>
            <Select
              value={formData.departmentType}
              onValueChange={(value: DepartmentType) =>
                setFormData({ ...formData, departmentType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CREATIVE_DEPARMENT">Creative Department</SelectItem>
                <SelectItem value="GOOGLE_DEPARTMENT">Google Department</SelectItem>
                <SelectItem value="AUTOMATION_DEPARTMENT">
                  Automation Department
                </SelectItem>
                <SelectItem value="BLOG_DEPARTMENT">Blog Department</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update" : "Add"} Department
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}