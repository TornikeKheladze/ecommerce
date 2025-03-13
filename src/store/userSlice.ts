import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/common";

const initialState: { authorizedUser: User | undefined } = {
  authorizedUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // setValue: (state, action: PayloadAction<number>) => {
    //   state.value = action.payload;
    // },
  },
});

// export const { getAuthorizedUser } = userSlice.actions;
export default userSlice.reducer;
