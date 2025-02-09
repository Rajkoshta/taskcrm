
import { Plan } from "../types";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddEditPlanDialogProps {
  formData: Omit<Plan, "id">;
  setFormData: (data: Omit<Plan, "id">) => void;
  onSave: () => void;
  isEditing: boolean;
}

export const AddEditPlanDialog = ({
  formData,
  setFormData,
  onSave,
  isEditing,
}: AddEditPlanDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Plan" : "Add New Plan"}</DialogTitle>
        <DialogDescription>Fill in the details below</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <Input
          placeholder="Plan Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <Input
          placeholder="Price"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />
        {formData.features.map((feature, index) => (
          <Input
            key={index}
            placeholder={`Feature ${index + 1}`}
            value={feature}
            onChange={(e) => {
              const newFeatures = [...formData.features];
              newFeatures[index] = e.target.value;
              setFormData({ ...formData, features: newFeatures });
            }}
          />
        ))}
        <Button
          variant="outline"
          onClick={() =>
            setFormData({
              ...formData,
              features: [...formData.features, ""],
            })
          }
        >
          Add Feature
        </Button>
        <Button className="w-full" onClick={onSave}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </div>
    </DialogContent>
  );
};
