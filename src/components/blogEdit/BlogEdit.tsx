import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { allBlogs, selectedBlog } from "../../features/blog/blogSlice";

import BlogForm from "../blogForm/BlogForm";
import Header from "../header/Header";

const BlogEdit: React.FC = () => {
  interface paramTypes {
    blogId: string;
  }
  const { blogId } = useParams<paramTypes>();
  console.log(blogId);

  const blogs = useSelector(allBlogs);
  const blog = useSelector(selectedBlog);
  return (
    <>
      <Header />
      <BlogForm />
    </>
  );
};

export default BlogEdit;
