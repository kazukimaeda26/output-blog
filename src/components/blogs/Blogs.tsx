import React from "react";
import styles from "./Blogs.module.scss";
import { useSelector } from "react-redux";
import { allBlogs } from "../../features/blog/blogSlice";
import BlogCard from "../../components/blogCard/BlogCard";

const Blogs: React.FC = () => {
  const blogs = useSelector(allBlogs);

  return (
    <>
      <div className={styles.cardsWrapper}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default Blogs;
