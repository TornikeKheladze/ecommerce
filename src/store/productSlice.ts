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
    editProduct: (state, action: PayloadAction<Product>) => {
      const productIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex !== -1) {
        state.products[productIndex] = action.payload;
      }
    },
  },
});

export const { saveProducts, saveCategories, editProduct } =
  productSlice.actions;
export default productSlice.reducer;
