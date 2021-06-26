import React from "react";
import marked from "marked";
import { useSelector } from "react-redux";

import Header from "../header/Header";
import styles from "./BlogShow.module.scss";
import { getSelectedBlog } from "../../features/blog/blogSlice";

const BlogShow: React.FC = () => {
  const selectedBlog = useSelector(getSelectedBlog);
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <p>
            {selectedBlog.updatedAt === ""
              ? `${selectedBlog.createdAt}に作成`
              : `${selectedBlog.updatedAt}に更新`}
          </p>
          <h1 className={styles.title}>
            <span
              dangerouslySetInnerHTML={{ __html: marked(selectedBlog.title) }}
            />
          </h1>
        </div>
        <div className={styles.text}>
          <span
            dangerouslySetInnerHTML={{ __html: marked(selectedBlog.text) }}
          />
        </div>
      </div>
    </>
  );
};

export default BlogShow;
