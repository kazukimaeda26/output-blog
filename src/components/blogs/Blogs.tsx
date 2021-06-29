import React, { useEffect } from "react";
import styles from "./Blogs.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { allBlogs, fetchBlogs } from "../../features/blog/blogSlice";
import BlogCard from "../../components/blogCard/BlogCard";
import { AppDispatch } from "../../app/store";

const Blogs: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const blogs = useSelector(allBlogs);

  useEffect(() => {
    const getData = () => {
      dispatch(fetchBlogs());
    };
    getData();
  }, []);

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
