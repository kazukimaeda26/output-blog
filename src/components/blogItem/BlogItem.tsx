import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDispatch } from "react-redux";
import {
  selectBlog,
  toggleEditState,
  deleteBlog,
  setTmpBlog,
  fetchBlogs,
} from "../../features/blog/blogSlice";
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

  return (
    <>
      <TableRow key={blog.id} onClick={() => history.push(`/blog/${blog.id}`)}>
        <TableCell align="center">{blog.title}</TableCell>
        <TableCell align="center">{blog.createdAt}</TableCell>
        <TableCell align="center">{blog.updatedAt}</TableCell>
        <TableCell align="center">{blog.likes}</TableCell>
      </TableRow>
    </>
  );
};

export default BlogItem;
