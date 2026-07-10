import { createSlice } from "@reduxjs/toolkit";
import { Checkout } from "./checkoutThunk";

type checkoutState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};
const initialState: checkoutState = {
  error: null,
  loading: false,
  success: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers:{
    resetCheckout:(state)=>{
        state.loading=false
        state.success=true
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(Checkout.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    })
    .addCase(Checkout.fulfilled,(state)=>{
      state.loading=false
      state.success=true
    })
    .addCase(Checkout.rejected,(state,action)=>{
        state.loading = false;
        state.success = false;
        state.error = action.error.message??"Checkout Failed"
    })
  },
});
export const {resetCheckout}=checkoutSlice.actions
export default checkoutSlice.reducer