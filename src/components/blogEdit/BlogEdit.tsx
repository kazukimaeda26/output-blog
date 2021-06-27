import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import BlogForm from "../blogForm/BlogForm";
import AdminHeader from "../adminHeader/AdminHeader";
import { auth } from "../../firebase";

const BlogEdit: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) history.push("/admin-auth");
    });
  });
  return (
    <>
      <AdminHeader />
      <BlogForm />
    </>
  );
};

export default BlogEdit;
