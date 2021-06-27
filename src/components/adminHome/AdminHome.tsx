import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import AdminHeader from "../adminHeader/AdminHeader";
import AdminBlogs from "../adminBlogs/AdminBlogs";
import styles from "./AdminHome.module.scss";
import { AppDispatch } from "../../app/store";
import { auth } from "../../firebase";

const AdminHome: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) history.push("/admin-auth");
    });
  }, []);

  return (
    <>
      <AdminHeader />
      <div className={styles.blogsWrapper}>
        <AdminBlogs />
      </div>
    </>
  );
};

export default AdminHome;
