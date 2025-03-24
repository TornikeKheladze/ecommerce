import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/common";

type InitialState = {
  userPurchases: {
    userEmail: string;
    products: Product[];
    time: string;
    price: string;
  }[];
};

const initialState: InitialState = {
  userPurchases: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    savePurchases: (
      state,
      action: PayloadAction<{
        userEmail: string;
        products: Product[];
        time: string;
        price: string;
      }>
    ) => {
      const { userEmail, products, time, price } = action.payload;

      const userIndex = state.userPurchases.findIndex(
        (user) => user.userEmail === userEmail
      );

      if (userIndex !== -1) {
        state.userPurchases[userIndex] = action.payload;
      } else {
        state.userPurchases.push({ userEmail, products, time, price });
      }
    },
  },
});

export const { savePurchases } = purchaseSlice.actions;
export default purchaseSlice.reducer;
