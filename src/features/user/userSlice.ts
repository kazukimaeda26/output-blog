import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface userState {
  isSignIn: boolean;
  isAdmin: boolean;
}
const initialState: userState = {
  isSignIn: true,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleIsSignIn: (state, action) => {
      state.isSignIn = action.payload;
    },
    toggleIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});
export const { toggleIsSignIn, toggleIsAdmin } = userSlice.actions;

export const getIsAdmin = (state: RootState): userState["isAdmin"] =>
  state.user.isAdmin;
export const getIsSignIn = (state: RootState): userState["isSignIn"] =>
  state.user.isSignIn;
export default userSlice.reducer;
