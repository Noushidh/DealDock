import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import { fetchProducts } from "./productThunk";

type ProductState = {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  price: string;
  wishlist: string[];
  search:string

  currentPage: number;
  totalPages: number;
  totalProducts: number;
};

const initialState: ProductState = {
  products: [],
  wishlist: [],
  selectedProduct: null,
  loading: false,
  error: null,
  search:"",
  price: "",

  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
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
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setPrice(state, action: PayloadAction<string>) {
      state.price = action.payload;
    },
    setFilteredProducts: (
      state,
      action: PayloadAction<{
        products: Product[];
        currentPage: number;
        totalPages: number;
        totalProducts: number;
      }>,
    ) => {
      state.products = action.payload.products;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalProducts = action.payload.totalProducts;
    },
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
  setPrice,
  setFilteredProducts,
} = productSlice.actions;
export default productSlice.reducer;
