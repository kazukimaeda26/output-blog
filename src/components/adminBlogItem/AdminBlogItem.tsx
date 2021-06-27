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
import styles from "./AdminBlogItem.module.scss";

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

const AdminBlogItem: React.FC<propType> = ({ blog }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEditBlog = () => {
    dispatch(selectBlog(blog));
    dispatch(toggleEditState(true));
    dispatch(setTmpBlog(""));
    const path = `/blog/edit/${blog.id}`;
    history.push(path);
  };

  const handleDeleteBlog = async (id: string) => {
    await deleteBlog(id);
    dispatch(fetchBlogs());
  };

  return (
    <>
      <TableRow key={blog.id}>
        <TableCell align="right">{blog.id}</TableCell>
        <TableCell align="center">{blog.title}</TableCell>
        <TableCell align="right">{blog.createdAt}</TableCell>
        <TableCell align="right">{blog.updatedAt}</TableCell>
        <TableCell align="right">{blog.likes}</TableCell>
        <TableCell align="center" onClick={handleEditBlog}>
          <div className={styles.iconWrapper}>
            <EditIcon className={styles.editIcon} />
            編集
          </div>
        </TableCell>
        <TableCell align="center">
          <div
            className={styles.iconWrapper}
            onClick={() => handleDeleteBlog(blog.id)}
          >
            <DeleteIcon className={styles.deleteIcon} />
            削除
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminBlogItem;