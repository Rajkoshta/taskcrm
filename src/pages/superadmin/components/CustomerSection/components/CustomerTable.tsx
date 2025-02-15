
import { useState, useEffect } from "react";
import { Search, Download, ChevronDown, Trash, Eye } from 'lucide-react';
import { Button } from '@/components/ui//button';
import { AddCustomerDialog } from './AddCustomerDialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui//input';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomersByAdmin,addCustomer  } from '@/redux/slices/customerSlice';
import { RootState } from "@/redux/store/store";


interface Service {
  serviceType: string;
  status: string;
  isActive: boolean;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  address: string;
  zipCode: string;
  status: string;
  services: Service[];
}

const statusStyles = {
  pending: 'bg-orange-100 text-orange-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700'
};

export const CustomerTable = () => {
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

 const { customers, status, error } = useSelector(
    (state: RootState) => state.customers
  );

   // Fetch token and admin username from localStorage (or context if stored elsewhere)
   const token = localStorage.getItem("token");
   const adminUsername = localStorage.getItem("adminUsername") || "";

   // Fetch customers on mount
   useEffect(() => {
    if (customers.length === 0 && status === 'idle') {
      dispatch(fetchCustomersByAdmin({ page: 0, size: 10,}));
    }
  }, [dispatch, customers.length, status]);
  


  const handleDelete = (id: number) => {
    // Implementation for delete functionality
    toast({
      title: "Success",
      description: "Customer deleted successfully"
    });
  };

  // const handleViewCustomer = (customerId: number) => {
  //   navigate(`/customer/${customerId}`);
  // };

  const handleViewCustomer = (customer: any) => {
    navigate(`/customer/${customer.id}`, { state: { customer } }); // ✅ Passing id and data
  };

  const filteredCustomers = (customers || []).filter(customer =>
    (customer.name && customer.name.toLowerCase().includes(search.toLowerCase())) ||
    (customer.email && customer.email.toLowerCase().includes(search.toLowerCase())) ||
    (customer.businessName && customer.businessName.toLowerCase().includes(search.toLowerCase()))
  );
  
  
  

  if (status === 'loading') {
    return <div>Loading...</div>;
  }


  const handleAddCustomer = (customerData: Customer) => {
    dispatch(addCustomer(customerData));
    toast({
      title: "Success",
      description: "Customer added successfully!",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
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
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration</th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {format(new Date(customer.createdAt), 'MMM dd, yyyy')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(customer.createdAt), 'HH:mm:ss')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{customer.businessName}</div>
                  <div className="text-sm text-gray-500">{customer.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.email}</div>
                  <div className="text-sm text-gray-500">{customer.phoneNumber}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {format(new Date(customer.expirationDate), 'MMM dd, yyyy')}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusStyles[customer.status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-700'}`}>
                    {customer.status?.replace('_', ' ').toUpperCase() || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      // onClick={() => handleViewCustomer(customer.id)}
                      onClick={() => handleViewCustomer(customer)}
                    >
                      <Eye className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDelete(customer.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};