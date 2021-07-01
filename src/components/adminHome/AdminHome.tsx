import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import AdminHeader from "../adminHeader/AdminHeader";
import AdminBlogs from "../adminBlogs/AdminBlogs";
import styles from "./AdminHome.module.scss";
import { auth } from "../../firebase";

const AdminHome: React.FC = () => {
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
