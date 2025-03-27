import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/common";

type InitialState = {
  products: Product[];
  categories: string[];
  usersWithFav: { userEmail: string; favProducts: Product[] }[];
};

const initialState: InitialState = {
  products: [],
  categories: [],
  usersWithFav: [],
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
    saveFavourites: (
      state,
      action: PayloadAction<{ userEmail: string; products: Product[] }>
    ) => {
      const { userEmail, products } = action.payload;

      const userIndex = state.usersWithFav.findIndex(
        (user) => user.userEmail === userEmail
      );

      const productsToUpdate = state.products.filter((stp) =>
        products.map((p) => p.id).includes(stp.id)
      );

      if (userIndex !== -1) {
        state.usersWithFav[userIndex].favProducts = productsToUpdate;
      } else {
        state.usersWithFav.push({ userEmail, favProducts: productsToUpdate });
      }
    },
  },
});

export const { saveProducts, saveCategories, editProduct, saveFavourites } =
  productSlice.actions;
export default productSlice.reducer;
