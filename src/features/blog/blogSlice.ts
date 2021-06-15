import { createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import sampleData from "./sampleData.json";

export interface blogState {
  idCount: number;
  blogs: {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
  }[];
  selectedBlog: {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
  };
}

const initialState: blogState = {
  idCount: 0,
  blogs: [...sampleData],
  selectedBlog: {
    id: 1,
    title: "111",
    text: "111 text",
    createdAt: "20200101",
    updatedAt: "20200201",
    likes: 70,
  },
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlog: (state, action) => {
      const newBlog = {
        id: 100,
        title: "sample title",
        text: "action.payload",
        createdAt: "0615",
        updatedAt: "0615",
        likes: 0,
      };
      state.blogs = [newBlog, ...state.blogs];
    },
    CountUp: (state, action) => {
      state.idCount++;
    },
  },
});
export const allBlogs = (state: RootState): blogState["blogs"] =>
  state.blog.blogs;
export const { CountUp, createBlog } = blogSlice.actions;

export default blogSlice.reducer;
