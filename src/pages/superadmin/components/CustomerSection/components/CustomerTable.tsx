import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomersByAdmin } from "@/redux/customerSlice";
import { RootState, AppDispatch } from "@/redux/store/store";
import { Search, Download, ChevronDown, Pen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddCustomerDialog } from "./AddCustomerDialog";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const statusStyles = {
  done: "bg-green-100 text-green-700",
  pending: "bg-orange-100 text-orange-700",
  processing: "bg-blue-100 text-blue-700",
};

export const CustomerTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, status, error } = useSelector((state: RootState) => state.customers);

  const [search, setSearch] = useState("");
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchCustomersByAdmin({ page: 0, size: 10, adminUsername: "admin@mbg.com", token: "your_token" }));
  }, [dispatch]);

  const handleDelete = (id: number) => {
    toast({
      title: "Success",
      description: "Customer deleted successfully",
    });
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setIsEditDialogOpen(false);
    setEditingCustomer(null);
    toast({
      title: "Success",
      description: "Customer updated successfully",
    });
  };

  const handleAddCustomer = (customerData: Omit<Customer, "id" | "company" | "country">) => {
    toast({
      title: "Success",
      description: "Customer added successfully",
    });
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.businessName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              Sort
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <AddCustomerDialog onAddCustomer={handleAddCustomer} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {status === "loading" && <p className="text-center py-4">Loading customers...</p>}
        {status === "failed" && <p className="text-center py-4 text-red-500">{error}</p>}
        {status === "succeeded" && (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.businessName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {customer.services.map((service) => service.serviceType).join(", ") || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={customer.status}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[customer.status]}`}
                    >
                      <option value="done">Done</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditCustomer(customer)}>
                        <Pen className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(customer.id)}>
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
