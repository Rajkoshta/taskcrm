
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Package, Building } from "lucide-react";
import { User, Plan, Department } from "./user-section/types";
import { UsersTable } from "./user-section/components/UsersTable";
import { PlansTable } from "./user-section/components/PlansTable";
import { DepartmentsTable } from "./user-section/components/DepartmentsTable";
import { AddEditUserDialog } from "./user-section/components/AddEditUserDialog";
import { AddEditPlanDialog } from "./user-section/components/AddEditPlanDialog";
import { AddEditDepartmentDialog } from "./user-section/components/AddEditDepartmentDialog";

const UserSection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"users" | "plans" | "departments">("users");
  
  // State Management
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: 1,
      name: "Basic",
      price: "$10/month",
      features: ["Feature 1", "Feature 2"],
    },
    {
      id: 2,
      name: "Premium",
      price: "$20/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$50/month",
      features: ["All Features"],
    },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: "Engineering",
      description: "Software development team",
    },
    {
      id: 2,
      name: "Marketing",
      description: "Marketing and sales team",
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      department: "Engineering",
      plan: "Premium",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      department: "Marketing",
      plan: "Basic",
      role: "User",
    },
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    plan: "",
    role: "",
  });

  const [planFormData, setPlanFormData] = useState({
    name: "",
    price: "",
    features: [""],
  });

  const [departmentFormData, setDepartmentFormData] = useState({
    name: "",
    description: "",
  });

  // User Management Functions
  const handleAddUser = () => {
    const newUser: User = {
      id: users.length + 1,
      ...formData,
    };
    setUsers([...users, newUser]);
    setFormData({
      name: "",
      email: "",
      department: "",
      plan: "",
      role: "",
    });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "User added successfully",
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData(user);
    setIsDialogOpen(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? { ...user, ...formData } : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    setIsDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      department: "",
      plan: "",
      role: "",
    });
    toast({
      title: "Success",
      description: "User updated successfully",
    });
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    toast({
      title: "Success",
      description: "User deleted successfully",
    });
  };

  // Plan Management Functions
  const handleAddPlan = () => {
    const newPlan: Plan = {
      id: plans.length + 1,
      ...planFormData,
    };
    setPlans([...plans, newPlan]);
    setPlanFormData({
      name: "",
      price: "",
      features: [""],
    });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Plan added successfully",
    });
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setPlanFormData(plan);
    setIsDialogOpen(true);
  };

  const handleUpdatePlan = () => {
    if (!editingPlan) return;
    const updatedPlans = plans.map((plan) =>
      plan.id === editingPlan.id ? { ...plan, ...planFormData } : plan
    );
    setPlans(updatedPlans);
    setEditingPlan(null);
    setIsDialogOpen(false);
    setPlanFormData({
      name: "",
      price: "",
      features: [""],
    });
    toast({
      title: "Success",
      description: "Plan updated successfully",
    });
  };

  const handleDeletePlan = (planId: number) => {
    setPlans(plans.filter((plan) => plan.id !== planId));
    toast({
      title: "Success",
      description: "Plan deleted successfully",
    });
  };

  // Department Management Functions
  const handleAddDepartment = () => {
    const newDepartment: Department = {
      id: departments.length + 1,
      ...departmentFormData,
    };
    setDepartments([...departments, newDepartment]);
    setDepartmentFormData({
      name: "",
      description: "",
    });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Department added successfully",
    });
  };

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setDepartmentFormData(department);
    setIsDialogOpen(true);
  };

  const handleUpdateDepartment = () => {
    if (!editingDepartment) return;
    const updatedDepartments = departments.map((department) =>
      department.id === editingDepartment.id
        ? { ...department, ...departmentFormData }
        : department
    );
    setDepartments(updatedDepartments);
    setEditingDepartment(null);
    setIsDialogOpen(false);
    setDepartmentFormData({
      name: "",
      description: "",
    });
    toast({
      title: "Success",
      description: "Department updated successfully",
    });
  };

  const handleDeleteDepartment = (departmentId: number) => {
    setDepartments(departments.filter((department) => department.id !== departmentId));
    toast({
      title: "Success",
      description: "Department deleted successfully",
    });
  };

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
          >
            Users
          </Button>
          <Button
            variant={activeTab === "plans" ? "default" : "outline"}
            onClick={() => setActiveTab("plans")}
          >
            Plans
          </Button>
          <Button
            variant={activeTab === "departments" ? "default" : "outline"}
            onClick={() => setActiveTab("departments")}
          >
            Departments
          </Button>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              {activeTab === "users" && <UserPlus className="mr-2 h-4 w-4" />}
              {activeTab === "plans" && <Package className="mr-2 h-4 w-4" />}
              {activeTab === "departments" && <Building className="mr-2 h-4 w-4" />}
              Add {activeTab.slice(0, -1)}
            </Button>
          </DialogTrigger>
          {activeTab === "users" && (
            <AddEditUserDialog
              formData={formData}
              setFormData={setFormData}
              departments={departments}
              plans={plans}
              onSave={editingUser ? handleUpdateUser : handleAddUser}
              isEditing={!!editingUser}
            />
          )}
          {activeTab === "plans" && (
            <AddEditPlanDialog
              formData={planFormData}
              setFormData={setPlanFormData}
              onSave={editingPlan ? handleUpdatePlan : handleAddPlan}
              isEditing={!!editingPlan}
            />
          )}
          {activeTab === "departments" && (
            <AddEditDepartmentDialog
              formData={departmentFormData}
              setFormData={setDepartmentFormData}
              onSave={editingDepartment ? handleUpdateDepartment : handleAddDepartment}
              isEditing={!!editingDepartment}
            />
          )}
        </Dialog>
      </div>

      <div className="rounded-md border bg-white">
        {activeTab === "users" && (
          <UsersTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        )}

        {activeTab === "plans" && (
          <PlansTable
            plans={plans}
            onEdit={handleEditPlan}
            onDelete={handleDeletePlan}
          />
        )}

        {activeTab === "departments" && (
          <DepartmentsTable
            departments={departments}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
          />
        )}
      </div>
    </div>
  );
};

export default UserSection;
