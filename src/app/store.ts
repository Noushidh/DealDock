import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import productReducer from "../features/productSlice";
import cartSlice from "../features/cartSlice"

 export const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer,
    cart:cartSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;