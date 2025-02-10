import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components//ui/button';
import { Input } from '@/components//ui/input';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddCustomerDialogProps {
  onAddCustomer: (customer: {
    name: string;
    phone: string;
    email: string;
    plan: string;
    expireDate: string;
    status: 'done' | 'pending' | 'processing';
  }) => void;
}

export const AddCustomerDialog = ({ onAddCustomer }: AddCustomerDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    plan: string;
    expireDate: string;
    status: 'done' | 'pending' | 'processing';
  }>({
    name: '',
    phone: '',
    email: '',
    plan: '',
    expireDate: '',
    status: 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onAddCustomer(formData);
    
    setFormData({
      name: '',
      phone: '',
      email: '',
      plan: '',
      expireDate: '',
      status: 'pending'
    });
    
    setOpen(false);
    toast({
      title: "Success",
      description: "Customer added successfully"
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name *
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number *
              </label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="plan" className="text-sm font-medium">
                Plan
              </label>
              <Input
                id="plan"
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                placeholder="Enter plan"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="expireDate" className="text-sm font-medium">
                Plan Expire Date
              </label>
              <Input
                id="expireDate"
                type="date"
                value={formData.expireDate}
                onChange={(e) => setFormData({ ...formData, expireDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Work Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'done' | 'pending' | 'processing' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Customer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};