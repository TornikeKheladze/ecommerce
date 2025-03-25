import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/common";

type InitialState = {
  userWithCart: { userEmail: string; cartProducts: Product[] }[];
};

const initialState: InitialState = {
  userWithCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveCartProducts: (
      state,
      action: PayloadAction<{ userEmail: string; products: Product[] }>
    ) => {
      const { userEmail, products } = action.payload;

      const userIndex = state.userWithCart.findIndex(
        (user) => user.userEmail === userEmail
      );

      if (userIndex !== -1) {
        state.userWithCart[userIndex].cartProducts = products;
      } else {
        state.userWithCart.push({ userEmail, cartProducts: products });
      }
    },
    clearCart: (state) => {
      state.userWithCart = [];
    },
  },
});

export const { saveCartProducts, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
