import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

type ProductState = {
  products: Product[];
  selectedProduct:Product|null;
};

const initialState: ProductState = {
  products: [],
  selectedProduct:null
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    setSelectedProduct:(state,action:PayloadAction<Product|null>)=>{
       state.selectedProduct = action.payload;
    },
    updateProduct :(state,action:PayloadAction<Product>)=>{
       state.products = state.products.map((product)=>(
        product._id === action.payload._id ? action.payload:product
       ))
    },
    deleteProduct:(state,action:PayloadAction<string>)=>{
        state.products = state.products.filter((product)=>product._id !== action.payload)
    }
  },
});

export const { setProducts, addProduct ,setSelectedProduct,updateProduct,deleteProduct} = productSlice.actions;
export default productSlice.reducer;
