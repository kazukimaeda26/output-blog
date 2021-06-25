import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface userState {
  isAdmin: boolean;
}
const initialState: userState = {
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleUserState: (state) => {
      state.isAdmin = !state.isAdmin;
    },
  },
});
export const { toggleUserState } = userSlice.actions;

export const getUserState = (state: RootState): userState["isAdmin"] =>
  state.user.isAdmin;

export default userSlice.reducer;
