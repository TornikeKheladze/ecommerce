import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/common";

type Purchase = {
  userEmail: string;
  products: Product[];
  time: string;
  price: string;
};

type InitialState = {
  userPurchases: Purchase[];
};

const initialState: InitialState = {
  userPurchases: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    savePurchases: (state, action: PayloadAction<Purchase>) => {
      state.userPurchases = [...state.userPurchases, action.payload];
    },
  },
});

export const { savePurchases } = purchaseSlice.actions;
export default purchaseSlice.reducer;
