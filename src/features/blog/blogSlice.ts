import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
// import sampleData from "./sampleData.json";
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
  edit: boolean;
}

const initialState: blogState = {
  idCount: 0,
  blogs: [],
  selectedBlog: {
    id: 1,
    title: "",
    text: "",
    createdAt: "",
    updatedAt: "",
    likes: 0,
  },
  edit: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlog: (state, action) => {
      state.idCount++;
      const now = new Date();
      const newBlog = {
        id: state.idCount,
        title: action.payload.blogTitle,
        text: action.payload.blogText,
        createdAt: now.toLocaleString(),
        updatedAt: now.toLocaleString(),
        likes: 0,
      };
      state.blogs = [newBlog, ...state.blogs];
    },
    updateBlog: (state, action) => {
      const now = new Date();
      const editBlog = state.blogs.find(
        (blog) => blog.id === Number(action.payload.blogId)
      );
      if (editBlog) {
        editBlog.title = action.payload.blogTitle;
        editBlog.text = action.payload.blogText;
        editBlog.updatedAt = now.toLocaleString();
      }
    },
    deleteBlog: (state, action) => {
      console.log(action.payload.id);
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload.id);
    },
    selectBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    toggleEditState: (state, action) => {
      state.edit = action.payload;
    },
  },
});
export const {
  createBlog,
  updateBlog,
  deleteBlog,
  selectBlog,
  toggleEditState,
} = blogSlice.actions;

export const allBlogs = (state: RootState): blogState["blogs"] =>
  state.blog.blogs;

export const getSelectedBlog = (state: RootState): blogState["selectedBlog"] =>
  state.blog.selectedBlog;

export const getEditState = (state: RootState): blogState["edit"] =>
  state.blog.edit;

export default blogSlice.reducer;
