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
    completed: boolean;
  }[];
  selectedBlog: {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
    completed: boolean;
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
    completed: false,
  },
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlog: (state, action) => {
      const now = new Date();
      const newBlog = {
        id: state.blogs.length,
        title: action.payload.blogTitle,
        text: action.payload.blogText,
        createdAt: now.toLocaleString(),
        updatedAt: now.toLocaleString(),
        likes: 0,
        completed: true,
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
