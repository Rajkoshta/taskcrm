import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  email: string;
  username: string;
  role: "SUPERADMIN" | "DEPARTMENT_USER" | "CUSTOMER";
  accessToken: string;
  refreshToken: string;
  departmentType: string | null;
  ownerName: string | null;
  businessName: string | null;
  phoneNumber: string | null;
  additionalPhone: string | null;
  address: string | null;
  zipCode: string | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const API_URL = "http://localhost:8080/api/auth/login";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, credentials);
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(response.data.message || "Login failed");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;