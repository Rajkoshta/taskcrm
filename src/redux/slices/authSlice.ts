import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface User {
  id: number;
  email: string;
  username: string;
  role: "SUPERADMIN" | "DEPARTMENT_USER" | "CUSTOMER";
  accessToken: string;
  refreshToken: string;
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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Load user data from localStorage (if available)
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");
const storedRole = localStorage.getItem("role");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  role: storedRole || null,
  isAuthenticated: !!storedToken,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/login`, credentials);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
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
        
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer;
