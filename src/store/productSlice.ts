import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/common";

type InitialState = { products: Product[]; categories: string[] };

const initialState: InitialState = {
  products: [],
  categories: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = [...action.payload];
    },
    saveCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = [...action.payload];
    },
  },
});

export const { saveProducts, saveCategories } = productSlice.actions;
export default productSlice.reducer;
