import api from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  address: string;
  zipCode: string;
  services: {
    serviceType: string;
    status: string;
    isActive: boolean;
  }[];
}

interface CustomerState {
  customers: Customer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  status: "idle",
  error: null,
};

export const fetchCustomersByAdmin = createAsyncThunk(
  "customers/fetchCustomersByAdmin",
  async ({ page, size }: { page: number; size: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); 
      const adminUsername = JSON.parse(localStorage.getItem("user") || "{}").email; 
      {console.log("this is admin username", adminUsername)}
      
      if (!token || !adminUsername) {
        return rejectWithValue("Authentication token or admin email is missing");
      }

      const response = await api.get(`/auth/admin/customers?page=${page}&size=${size}`, {
        headers: { 
          Authorization: `Bearer ${token}`, 
          adminUsername 
        },
        
      });

      console.log("API Response:", response.data.data);

      if (!response.data.data || response.data.data.length === 0) {
        return rejectWithValue("No customers found.");
      }

      return response.data.data.map((customer: any) => ({
        id: customer.customerId || "NA",
        name: customer.ownerName || customer?.customerDetails?.ownerName || "NA",
        email: customer.email || customer?.customerDetails?.email || "NA",
        phoneNumber: customer.phoneNumber || customer?.customerDetails?.phoneNumber || "NA",
        businessName: customer.businessName || customer?.customerDetails?.businessName || "NA",
        address: customer.address || customer?.customerDetails?.address || "NA",
        zipCode: customer.zipCode || customer?.customerDetails?.zipCode || "NA",
        status: customer.status || "NA",
        createdAt: customer.createdAt || "NA",
        expirationDate: customer.expirationDate || "NA",
        // Fixing service details mapping
        services: customer.customerServices?.length
          ? customer.customerServices.map((service: any) => ({
              serviceType: service.serviceType || "NA",
              status: service.status || "NA",
              isActive: service.isServiceActive || "NA",
            }))
          : [
              // Fallback to mapping from the parent customer object for department user
              {
                serviceType: customer?.serviceType || "NA",
                status: customer?.status || "NA",
                isActive: customer?.isServiceActive || "NA",
              },
            ],
      }));
          
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch customers.");
    }
  }
);



// Add Customer API Call
export const addCustomer = createAsyncThunk(
    "customers/addCustomer",
    async (customerData: Customer, { rejectWithValue }) => {
      try {
        const response = await api.post(`/auth/customers/register`, customerData);
        if (response.data.success) {
          return response.data.data;
        }
        return rejectWithValue(response.data.message || "Failed to add customer.");
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to add customer.");
      }
    }
  );



  // ==============================

  export const updateServiceStatus = createAsyncThunk(
    "customers/updateServiceStatus",
    async (
      { customerId, serviceType, newStatus, username }: { customerId: number; serviceType: string; newStatus: string; username: string },
      { rejectWithValue }
    ) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return rejectWithValue("Authentication token is missing");
        }
        
        const response = await api.post(
          "/auth/update/service",
          { customerId, serviceType, newStatus, username },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (!response.data.success) {
          return rejectWithValue(response.data.message || "Failed to update service status.");
        }
        
        return { customerId, serviceType, newStatus };
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to update service status.");
      }
    }
  );


const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearCustomers: (state) => {
      state.customers = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomersByAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCustomersByAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(fetchCustomersByAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateServiceStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateServiceStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { customerId, serviceType, newStatus } = action.payload;
        const customer = state.customers.find((c) => c.id === customerId);
        if (customer) {
          const service = customer.services.find((s) => s.serviceType === serviceType);
          if (service) {
            service.status = newStatus;
          }
        }
      })
      .addCase(updateServiceStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearCustomers } = customerSlice.actions;
export default customerSlice.reducer;
