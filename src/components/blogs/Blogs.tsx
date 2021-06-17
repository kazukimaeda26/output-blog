import React from "react";
import styles from "./Blogs.module.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import { allBlogs } from "../../features/blog/blogSlice";
import BlogItem from "../../components/blogItem/BlogItem";

function createData(
  id: number,
  title: string,
  createdAt: string,
  updatedAt: string,
  likes: number
) {
  return { id, title, createdAt, updatedAt, likes };
}

const Blogs: React.FC = () => {
  const blogs = useSelector(allBlogs);

  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="center">タイトル</TableCell>
            <TableCell align="right">作成日時</TableCell>
            <TableCell align="right">最終更新日時</TableCell>
            <TableCell align="right">いいね数</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;
