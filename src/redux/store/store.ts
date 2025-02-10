import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";
import customerReducer from "@/redux/customerSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;