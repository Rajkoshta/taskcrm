import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import customerReducer from "@/redux/slices/customerSlice";
import departmentReducer from "@/redux/slices/departmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    departments: departmentReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;