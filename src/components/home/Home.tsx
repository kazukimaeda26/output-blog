import React from "react";
import Header from "../header/Header";
import Blogs from "../blogs/Blogs";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.blogsWrapper}>
        <Blogs />
      </div>
    </>
  );
};

export default Home;
