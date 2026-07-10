import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import productReducer from "../features/productSlice";
import cartSlice from "../features/cartSlice"
import checkoutSlice from "../features/checkoutSlice"

 export const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer,
    cart:cartSlice,
    checkout:checkoutSlice
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;