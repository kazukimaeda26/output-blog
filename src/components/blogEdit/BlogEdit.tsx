import React from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { getEditState } from "../../features/blog/blogSlice";

import BlogForm from "../blogForm/BlogForm";
import Header from "../header/Header";

const BlogEdit: React.FC = () => {
  interface paramTypes {
    blogId: string;
  }
  const { blogId } = useParams<paramTypes>();

  return (
    <>
      <Header />
      <BlogForm />
    </>
  );
};

export default BlogEdit;
