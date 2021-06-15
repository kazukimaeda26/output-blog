import { createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface blogState {
  idCount: number;
  blogs: { id: number; title: string; text: string }[];
  selectedBlog: { id: number; title: string; text: string };
}

const initialState: blogState = {
  idCount: 0,
  blogs: [
    { id: 1, title: "111", text: "111 text" },
    { id: 2, title: "222", text: "222 text" },
  ],
  selectedBlog: { id: 1, title: "111", text: "111 text" },
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
      console.log(state.blogs);
    },
  },
});

export const { CountUp, bbb } = blogSlice.actions;

export default blogSlice.reducer;
