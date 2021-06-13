import { createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface blogState {
  idCount: number;
  login: boolean;
}

const initialState: blogState = {
  idCount: 0,
  login: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    CountUp: (state, action) => {
      console.log("state");
      state.idCount++;
    },
    bbb: (state, action) => {
      console.log(state);
      console.log(state.login);
      console.log(action);
      console.log(action.payload);
      state.login = action.payload;
    },
  },
});

export const { CountUp, bbb } = blogSlice.actions;

export default blogSlice.reducer;
