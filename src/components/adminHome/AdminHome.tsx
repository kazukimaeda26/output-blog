import React from "react";
import Header from "../header/Header";
import AdminBlogs from "../adminBlogs/AdminBlogs";
import styles from "./AdminHome.module.scss";

const AdminHome: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.blogsWrapper}>
        <AdminBlogs />
      </div>
    </>
  );
};

export default AdminHome;
