import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Checkout = createAsyncThunk(
  "checkout/placeOrder",
  async (productIds: string[]) => {
    const response = await axios.post(`http://localhost:5000/api/checkout`, {
      productIds,
    });
    return response.data;
  },
);
