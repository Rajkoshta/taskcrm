import { useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const CustomerDetails = () => {
  const { id } = useParams();
  const { state } = useLocation(); // ✅ Get customer data from navigate state
  const navigate = useNavigate();

  // Fetch customer from state if exists, otherwise fetch from Redux store
  const customer = state?.customer || useSelector((state: RootState) =>
    state.customers.customers.find((c) => c.id === Number(id))
  );

  if (!customer) {
    return <div className="text-red-500 text-center mt-10 text-lg">Customer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Customers
          </Button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Customer Details</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">Business Information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Business Name</label>
                    <p className="text-gray-900">{customer.businessName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Owner Name</label>
                    <p className="text-gray-900">{customer.name}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="text-gray-900">{customer.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone Number</label>
                    <p className="text-gray-900">{customer.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Additional Phone</label>
                    <p className="text-gray-900">{customer.additionalPhone || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">Address</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Street Address</label>
                    <p className="text-gray-900">{customer.address}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Zip Code</label>
                    <p className="text-gray-900">{customer.zipCode}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">Status & Dates</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <p className="text-gray-900">{customer.status}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Expiration Date</label>
                    <p className="text-gray-900">
                      {customer.expirationDate
                        ? format(new Date(customer.expirationDate), "MMM dd, yyyy")
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Created At</label>
                    <p className="text-gray-900">
                      {customer.createdAt
                        ? format(new Date(customer.createdAt), "MMM dd, yyyy")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customer.services && customer.services.length > 0 ? (
                  customer.services.map((service: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-medium text-gray-800">{service.serviceType}</h3>
                      <div className="mt-2 space-y-2">
                        <div>
                          <label className="text-sm text-gray-500">Status</label>
                          <p className="text-gray-900">{service.status}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Expiration</label>
                          <p className="text-gray-900">
                            {service.serviceExpirationInMonths || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Department</label>
                          <p className="text-gray-900">{service.department}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No services found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDetails;
