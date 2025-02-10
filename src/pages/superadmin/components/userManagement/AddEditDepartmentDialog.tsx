
import { Department } from "../types";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddEditDepartmentDialogProps {
  formData: Omit<Department, "id">;
  setFormData: (data: Omit<Department, "id">) => void;
  onSave: () => void;
  isEditing: boolean;
}

export const AddEditDepartmentDialog = ({
  formData,
  setFormData,
  onSave,
  isEditing,
}: AddEditDepartmentDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {isEditing ? "Edit Department" : "Add New Department"}
        </DialogTitle>
        <DialogDescription>Fill in the details below</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <Input
          placeholder="Department Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />
        <Input
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
        <Button className="w-full" onClick={onSave}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </div>
    </DialogContent>
  );
};