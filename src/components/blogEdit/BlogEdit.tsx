import React from "react";

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
