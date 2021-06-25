import { createSlice } from "@reduxjs/toolkit";
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

export default userSlice.reducer;
