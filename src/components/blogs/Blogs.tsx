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

function createData(
  id: number,
  title: string,
  createdAt: string,
  updatedAt: string,
  likes: number
) {
  return { id, title, createdAt, updatedAt, likes };
}

const rows = [
  createData(1, "title1", "20210613", "20210614", 100),
  createData(2, "title2", "20210613", "20210614", 100),
  createData(3, "title3", "20210613", "20210614", 100),
  createData(4, "title4", "20210613", "20210614", 100),
  createData(5, "title5", "20210613", "20210614", 100),
  createData(6, "title6", "20210613", "20210614", 100),
];

const Blogs: React.FC = () => {
  const blogs = useSelector(allBlogs);
  console.log(rows);
  console.log(blogs);

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
            <TableRow key={blog.id}>
              <TableCell align="right">{blog.id}</TableCell>
              <TableCell align="center">{blog.title}</TableCell>
              <TableCell align="right">{blog.createdAt}</TableCell>
              <TableCell align="right">{blog.updatedAt}</TableCell>
              <TableCell align="right">{blog.likes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;
