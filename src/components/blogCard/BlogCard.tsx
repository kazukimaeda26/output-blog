import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import noImage from "../../images/noImage.jpg";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { selectBlog } from "../../features/blog/blogSlice";
import { fetchComments } from "../../features/comment/commentSlice";
import styles from "./BlogCard.module.scss";

interface propType {
  blog: {
    id: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
  };
}

const BlogCard: React.FC<propType> = ({ blog }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let text = blog.text;
  if (text.length > 60) text = text.substr(0, 57) + "...";

  const addSelectedBlogAndTransition = () => {
    dispatch(
      selectBlog({
        id: blog.id,
        title: blog.title,
        text: blog.text,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        likes: blog.likes,
      })
    );
    const blog_id = blog.id;
    dispatch(fetchComments(blog_id));
    history.push(`/blog/${blog.id}`);
  };

  return (
    <>
      <div
        className={styles.blogCardWrapper}
        onClick={() => addSelectedBlogAndTransition()}
      >
        <div className={styles.imageWrapper}>
          <img className={styles.image} alt="complex" src={noImage} />
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.titleAndLikesWrapper}>
            <div className={styles.title}>{blog.title}</div>
            <div className={styles.likes}>
              <FavoriteIcon className={styles.favoriteIcon} />
              {blog.likes}
            </div>
          </div>
          <div className={styles.paragraph}>{text}</div>
          <div className={styles.date}>
            {blog.updatedAt !== ""
              ? `作成日：${blog.updatedAt}`
              : `更新日：${blog.createdAt}`}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
