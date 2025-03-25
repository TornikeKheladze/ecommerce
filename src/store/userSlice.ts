import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/common";

const initialState: { authorizedUser: User | undefined; users: User[] } = {
  authorizedUser: undefined,
  users: [],
};

type ChangePasswordPayload = {
  email: string;
  password: string;
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
    logout: (state) => (state.authorizedUser = undefined),
    changePassword: (state, action: PayloadAction<ChangePasswordPayload>) => {
      const { email, password } = action.payload;
      const userIndex = state.users.findIndex((item) => item.email === email);
      if (userIndex !== -1) {
        const updatedUser = { ...state.users[userIndex], password };
        state.users[userIndex] = updatedUser;
        state.authorizedUser = updatedUser;
      }
    },
  },
});

export const { registerUser, saveAuthUser, logout, changePassword } =
  userSlice.actions;
export default userSlice.reducer;
