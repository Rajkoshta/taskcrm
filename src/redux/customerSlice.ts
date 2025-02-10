import api from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

// const API_URL = "http://localhost:8080/api/auth/admin/customers";

export const fetchCustomersByAdmin = createAsyncThunk(
  "customers/fetchCustomersByAdmin",
  async (
    { page, size, adminUsername, token }: { page: number; size: number; adminUsername: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`${"/auth/admin/customers"}?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          adminUsername: adminUsername,
        },
      });

      // If the response indicates failure, reject with message
      if (!response.data.success) {
        return rejectWithValue(response.data.message || "Failed to fetch customers.");
      }

      return response.data.data.map((customer: any) => ({
        id: customer.customerId,
        name: customer.ownerName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        businessName: customer.businessName,
        address: customer.address,
        zipCode: customer.zipCode,
        services: customer.customerServices.map((service: any) => ({
          serviceType: service.serviceType,
          status: service.status,
          isActive: service.isServiceActive,
        })),
      }));
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch customers.");
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
      });
  },
});

export const { clearCustomers } = customerSlice.actions;
export default customerSlice.reducer;
