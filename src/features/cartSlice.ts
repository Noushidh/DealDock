import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

type CartItem = Product & {
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id,
      );
      if (!existingItem) {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (product) => product._id !== action.payload,
      );
    },
    clearCart:(state)=>{
      state.items = []
    }
  },
});

export const { addToCart, removeCart ,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
