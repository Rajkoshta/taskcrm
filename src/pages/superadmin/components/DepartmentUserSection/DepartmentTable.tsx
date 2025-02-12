
import { useState, useEffect } from "react";
import { Department } from "./department";
import { DepartmentForm } from "./DepartmentForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "@/redux/slices/departmentSlice";
import { RootState } from "@/redux/store/store";



export default function UserManagement() {
  const dispatch = useDispatch();

  const { departments, status, error } = useSelector((state: RootState) => state.departments);

  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(
    null
  );
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!departments.length && status === "idle") {
      dispatch(fetchDepartments() as any);
    }
  }, [dispatch, departments.length, status]);


  const handleAdd = (department: Partial<Department>) => {
    // const newDepartment: Department = {
    //   ...department,
    //   role: "DEPARTMENT_USER",
    //   createdAt: new Date().toISOString(),
    // } as Department;

    // setDepartments([...departments, newDepartment]);
    // setIsAddOpen(false);
    // toast({
    //   title: "Success",
    //   description: "Department added successfully",
    // });
  };

  const handleEdit = (department: Partial<Department>) => {
    // setDepartments(
    //   departments.map((d) =>
    //     d.username === selectedDepartment?.username
    //       ? { ...d, ...department }
    //       : d
    //   )
    // );
    
    // setIsEditOpen(false);
    // setSelectedDepartment(null);
    // toast({
    //   title: "Success",
    //   description: "Department updated successfully",
    // });
  };

  const handleDelete = () => {
    if (selectedDepartment) {
      toast({
        title: "Success",
        description: "Department deleted successfully (API integration needed).",
      });
      setIsDeleteOpen(false);
      setSelectedDepartment(null);
    }
  };

  const togglePasswordVisibility = (username: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {status === "failed" && (
        <p className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          ⚠️ Error fetching departments: {error}
        </p>
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Departments</h1>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Department
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Department Type</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.username}>
                <TableCell>{department.username}</TableCell>
                <TableCell>{department.email}</TableCell>
                <TableCell className="relative">
                  <span className="flex items-center space-x-2">
                    <span className="font-mono">
                      {department.password 
                        ? visiblePasswords[department.username]
                          ? department.password
                          : "••••••••"
                        : "No password"}
                    </span>
                    {department.password && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePasswordVisibility(department.username)}
                      >
                        {visiblePasswords[department.username] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  {department.departmentType.replace(/_/g, " ").toLowerCase()}
                </TableCell>
                <TableCell>
                  {new Date(department.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedDepartment(department);
                      setIsEditOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedDepartment(department);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DepartmentForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAdd}
      />

      <DepartmentForm
        open={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedDepartment(null);
        }}
        onSubmit={handleEdit}
        initialData={selectedDepartment || undefined}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              department.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteOpen(false);
                setSelectedDepartment(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}