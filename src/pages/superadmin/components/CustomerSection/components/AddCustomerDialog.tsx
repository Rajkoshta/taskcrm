import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Service {
  serviceType: 'API_AUTOMATION' | 'SMO' | 'SEO' | 'WEBSITE';
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PENDING';
  serviceExpirationInMonths: string;
}

interface CustomerData {
  ownerName: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  additionalPhone: string;
  address: string;
  zipCode: string;
  expirationInMonths: string;
  customerServices: Service[];
}

interface AddCustomerDialogProps {
  onAddCustomer: (customer: CustomerData) => void;
}

export const AddCustomerDialog = ({ onAddCustomer }: AddCustomerDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<CustomerData>({
    ownerName: '',
    businessName: '',
    email: '',
    phoneNumber: '',
    additionalPhone: '',
    address: '',
    zipCode: '',
    expirationInMonths: '12',
    customerServices: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.email || !formData.phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onAddCustomer(formData);
    
    setFormData({
      ownerName: '',
      businessName: '',
      email: '',
      phoneNumber: '',
      additionalPhone: '',
      address: '',
      zipCode: '',
      expirationInMonths: '12',
      customerServices: []
    });
    
    setOpen(false);
    toast({
      title: "Success",
      description: "Customer added successfully"
    });
  };

  const addService = () => {
    setFormData({
      ...formData,
      customerServices: [
        ...formData.customerServices,
        {
          serviceType: 'API_AUTOMATION',
          status: 'IN_PROGRESS',
          serviceExpirationInMonths: '6'
        }
      ]
    });
  };

  const removeService = (index: number) => {
    const newServices = formData.customerServices.filter((_, i) => i !== index);
    setFormData({ ...formData, customerServices: newServices });
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    const newServices = [...formData.customerServices];
    newServices[index] = {
      ...newServices[index],
      [field]: value
    } as Service;
    setFormData({ ...formData, customerServices: newServices });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="ownerName" className="text-sm font-medium">
                Owner Name *
              </label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                placeholder="Enter owner name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium">
                Business Name
              </label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Enter business name"
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
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number *
              </label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="additionalPhone" className="text-sm font-medium">
                Additional Phone
              </label>
              <Input
                id="additionalPhone"
                value={formData.additionalPhone}
                onChange={(e) => setFormData({ ...formData, additionalPhone: e.target.value })}
                placeholder="Enter additional phone"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter address"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="zipCode" className="text-sm font-medium">
                Zip Code
              </label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder="Enter zip code"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="expirationInMonths" className="text-sm font-medium">
                Expiration (Months)
              </label>
              <Input
                id="expirationInMonths"
                type="number"
                value={formData.expirationInMonths}
                onChange={(e) => setFormData({ ...formData, expirationInMonths: e.target.value })}
                placeholder="Enter expiration in months"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Services</h3>
              <Button type="button" onClick={addService} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>
            
            {formData.customerServices.map((service, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded-lg relative">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Type</label>
                  <select
                    value={service.serviceType}
                    onChange={(e) => updateService(index, 'serviceType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="API_AUTOMATION">API Automation</option>
                    <option value="SMO">SMO</option>
                    <option value="SEO">SEO</option>
                    <option value="WEBSITE">Website</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={service.status}
                    onChange={(e) => updateService(index, 'status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiration (Months)</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={service.serviceExpirationInMonths}
                      onChange={(e) => updateService(index, 'serviceExpirationInMonths', e.target.value)}
                      placeholder="Months"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeService(index)}
                      className="h-10 w-10"
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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