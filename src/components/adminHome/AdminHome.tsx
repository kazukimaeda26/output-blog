import React from "react";
import AdminHeader from "../adminHeader/AdminHeader";
import AdminBlogs from "../adminBlogs/AdminBlogs";
import styles from "./AdminHome.module.scss";

const AdminHome: React.FC = () => {
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
