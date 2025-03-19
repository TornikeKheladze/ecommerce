import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/common";

type InitialState = {
  usersWithFav: { userEmail: string; favProducts: Product[] }[];
};

const initialState: InitialState = {
  usersWithFav: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    saveFavourites: (
      state,
      action: PayloadAction<{ userEmail: string; products: Product[] }>
    ) => {
      const { userEmail, products } = action.payload;

      const userIndex = state.usersWithFav.findIndex(
        (user) => user.userEmail === userEmail
      );

      if (userIndex !== -1) {
        state.usersWithFav[userIndex].favProducts = products;
      } else {
        state.usersWithFav.push({ userEmail, favProducts: products });
      }
    },
  },
});

export const { saveFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
