
import { User, Department, Plan } from "../types";
import {
  DialogContent,
  DialogDescription,
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
import { Button } from "@/components/ui/button";

interface AddEditUserDialogProps {
  formData: Omit<User, "id">;
  setFormData: (data: Omit<User, "id">) => void;
  departments: Department[];
  plans: Plan[];
  onSave: () => void;
  isEditing: boolean;
}

export const AddEditUserDialog = ({
  formData,
  setFormData,
  departments,
  plans,
  onSave,
  isEditing,
}: AddEditUserDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogDescription>Fill in the details below</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <Input
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <Select
          value={formData.department}
          onValueChange={(value) =>
            setFormData({ ...formData, department: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.name}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={formData.plan}
          onValueChange={(value) =>
            setFormData({ ...formData, plan: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Plan" />
          </SelectTrigger>
          <SelectContent>
            {plans.map((plan) => (
              <SelectItem key={plan.id} value={plan.name}>
                {plan.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={formData.role}
          onValueChange={(value) =>
            setFormData({ ...formData, role: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-full" onClick={onSave}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </div>
    </DialogContent>
  );
};