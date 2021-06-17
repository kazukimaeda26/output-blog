import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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
    status: string;
  }[];
  selectedBlog: {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
    status: string;
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
    status: "",
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
        status: "new",
      };
      state.blogs = [newBlog, ...state.blogs];
    },
    updateBlog: (state, action) => {
      const now = new Date();
      const editBlog = {
        id: 100,
        title: "updated",
        text: "updated",
        updatedAt: now.toLocaleString(),
        status: "edit",
      };
      // state.blogs = [{ ...editBlog, ...state.blog }, ...state.blogs];
    },
    selectBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
  },
});
export const { createBlog, updateBlog, selectBlog } = blogSlice.actions;

export const allBlogs = (state: RootState): blogState["blogs"] =>
  state.blog.blogs;

export const selectedBlog = (state: RootState): blogState["selectedBlog"] =>
  state.blog.selectedBlog;

export default blogSlice.reducer;
