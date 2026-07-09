import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import productReducer from "../features/productSlice";

 export const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer
  },
});
export type RootState = ReturnType<typeof store.getState>