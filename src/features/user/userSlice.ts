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
    toggleIsAdmin: (state) => {
      state.isAdmin = !state.isAdmin;
    },
  },
});
export const { toggleIsAdmin } = userSlice.actions;

export const getIsAdmin = (state: RootState): userState["isAdmin"] =>
  state.user.isAdmin;

export default userSlice.reducer;
