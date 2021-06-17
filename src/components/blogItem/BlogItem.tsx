import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch } from "react-redux";
import { selectBlog } from "../../features/blog/blogSlice";
import { useHistory } from "react-router-dom";

interface propType {
  blog: {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
    status: string;
  };
}

const BlogItem: React.FC<propType> = ({ blog }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const transitionToEdit = () => {
    dispatch(selectBlog(blog));
    const path = `/blog/edit/${blog.id}`;
    history.push(path);
  };

  return (
    <>
      <TableRow key={blog.id} onClick={transitionToEdit}>
        <TableCell align="right">{blog.id}</TableCell>
        <TableCell align="center">{blog.title}</TableCell>
        <TableCell align="right">{blog.createdAt}</TableCell>
        <TableCell align="right">{blog.updatedAt}</TableCell>
        <TableCell align="right">{blog.likes}</TableCell>
        <TableCell align="center">編集ボタン</TableCell>
        <TableCell align="center">削除ボタン</TableCell>
      </TableRow>
    </>
  );
};

export default BlogItem;
