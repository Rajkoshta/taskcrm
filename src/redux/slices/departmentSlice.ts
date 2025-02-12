import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface Department {
  username: string;
  email: string;
  departmentType: string;
  role: string;
  createdAt: string;
}

interface DepartmentState {
  departments: Department[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DepartmentState = {
  departments: [],
  status: "idle",
  error: null,
};

// **Fetch Departments API Call**
export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/admin/departments", {
        headers: {
          username: "admin@mbg.com", // Change as needed
        },
      });

      if (!response.data.success) {
        return rejectWithValue(response.data.message || "Failed to fetch departments.");
      }

      return response.data.data.map((department: any) => ({
        username: department.username,
        email: department.email,
        departmentType: department.departmentType,
        role: department.role,
        createdAt: department.createdAt,
      }));
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch departments.");
    }
  }
);

// **Department Slice**
const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    clearDepartments: (state) => {
      state.departments = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
