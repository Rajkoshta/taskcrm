
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Breadcrumb from "@/components/Breadcrumb";

const CustomerList = () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      plan: "Premium",
      department: "Engineering",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      plan: "Basic",
      department: "Marketing",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumb />
      
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">Customer List</h1>
          <p className="text-secondary-foreground">Manage your customers</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </header>

      <Card className="glass-card p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.plan}</TableCell>
                <TableCell>{customer.department}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CustomerList;
