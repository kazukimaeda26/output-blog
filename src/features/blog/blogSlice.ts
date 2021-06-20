import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
// import sampleData from "./sampleData.json";

import { db } from "../../firebase";
export interface blogState {
  idCount: number;
  blogs: {
    id: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
  }[];
  selectedBlog: {
    id: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
  };
  edit: boolean;
  tmpBlog: {
    tmpTitle: string;
    tmpText: string;
  };
}

const initialState: blogState = {
  idCount: 0,
  blogs: [],
  selectedBlog: {
    id: "",
    title: "",
    text: "",
    createdAt: "",
    updatedAt: "",
    likes: 0,
  },
  edit: false,
  tmpBlog: {
    tmpTitle: "",
    tmpText: "",
  },
};

// blogの全件取得
export const fetchBlogs = createAsyncThunk("blog/getAllBlogs", async () => {
  const res = await db.collection("blogs").orderBy("dateTime", "desc").get();
  const allBlogs = res.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    text: doc.data().text,
  }));
  const blogNumber = allBlogs.length;
  const passData = { allBlogs, blogNumber };
  return passData;
});

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
    resetTmpTitleAndText: (state, action) => {
      state.tmpBlog.tmpTitle = action.payload;
      state.tmpBlog.tmpText = action.payload;
    },
    selectBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    toggleEditState: (state, action) => {
      state.edit = action.payload;
    },
    changeTmpTitle: (state, action) => {
      state.tmpBlog.tmpTitle = action.payload;
    },
    changeTmpText: (state, action) => {
      state.tmpBlog.tmpText = action.payload;
    },
    setTmpBlog: (state, action) => {
      state.tmpBlog.tmpTitle = state.selectedBlog.title;
      state.tmpBlog.tmpText = state.selectedBlog.text;
    },
    extraReducers: (builder) => {
      builder.addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload.allBlogs;
        state.idCount = action.payload.blogNumber;
      });
    },
  },
});
export const {
  createBlog,
  updateBlog,
  deleteBlog,
  selectBlog,
  toggleEditState,
  changeTmpTitle,
  changeTmpText,
  resetTmpTitleAndText,
  setTmpBlog,
} = blogSlice.actions;

export const allBlogs = (state: RootState): blogState["blogs"] =>
  state.blog.blogs;

export const getSelectedBlog = (state: RootState): blogState["selectedBlog"] =>
  state.blog.selectedBlog;

export const getEditState = (state: RootState): blogState["edit"] =>
  state.blog.edit;

export const getTmpBlog = (state: RootState): blogState["tmpBlog"] =>
  state.blog.tmpBlog;

export default blogSlice.reducer;
