import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import { fetchProducts } from "./productThunk";

type ProductState = {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  search:string;
  price:string;
};

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  search:"",
  price:""
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product,
      );
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload,
      );
    },
    setSearch(state,action:PayloadAction<string>){
      state.search = action.payload
    },
    setPrice(state,action:PayloadAction<string>){
      state.price = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message ?? "something went wrong";
        state.loading = false;
      });
  },
});

export const {
  addProduct,
  setSelectedProduct,
  updateProduct,
  deleteProduct,
  setSearch,
  setPrice
} = productSlice.actions;
export default productSlice.reducer;
