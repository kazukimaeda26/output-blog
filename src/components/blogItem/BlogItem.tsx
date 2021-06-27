import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { useDispatch } from "react-redux";
import {
  selectBlog,
  toggleEditState,
  deleteBlog,
  setTmpBlog,
  fetchBlogs,
} from "../../features/blog/blogSlice";
import { fetchComments } from "../../features/comment/commentSlice";

import { useHistory } from "react-router-dom";
import styles from "./BlogItem.module.scss";

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

const BlogItem: React.FC<propType> = ({ blog }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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
      <TableRow key={blog.id} onClick={() => addSelectedBlogAndTransition()}>
        <TableCell align="center">{blog.title}</TableCell>
        <TableCell align="center">{blog.createdAt}</TableCell>
        <TableCell align="center">{blog.updatedAt}</TableCell>
        <TableCell align="center">{blog.likes}</TableCell>
      </TableRow>
    </>
  );
};

export default BlogItem;
