import React from "react";
import styles from "./AdminBlogs.module.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import { allBlogs } from "../../features/blog/blogSlice";
import AdminBlogItem from "../adminBlogItem/AdminBlogItem";

const AdminBlogs: React.FC = () => {
  const blogs = useSelector(allBlogs);

  return (
    <div className={styles.tableWrapper}>
      <TableContainer component={Paper}>
        <Table className={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="center">タイトル</TableCell>
              <TableCell align="right">作成日時</TableCell>
              <TableCell align="right">最終更新日時</TableCell>
              <TableCell align="right">いいね数</TableCell>
              <TableCell align="center">編集する</TableCell>
              <TableCell align="center">削除する</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <AdminBlogItem key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminBlogs;
