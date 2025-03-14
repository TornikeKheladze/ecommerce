import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/common";

const initialState: { authorizedUser: User | undefined; users: User[] } = {
  authorizedUser: undefined,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
    saveAuthUser: (state, action: PayloadAction<User>) => {
      state.authorizedUser = action.payload;
    },
  },
});

export const { registerUser, saveAuthUser } = userSlice.actions;
export default userSlice.reducer;
