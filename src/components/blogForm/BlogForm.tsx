import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./BlogForm.module.scss";
import {
  createBlog,
  allBlogs,
  selectedBlog,
  getEditState,
} from "../../features/blog/blogSlice";

interface Inputs {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  completed: boolean;
}

const BlogForm = () => {
  const blogs = useSelector(allBlogs);
  const blog = useSelector(selectedBlog);
  const editState = useSelector(getEditState);

  const dispatch = useDispatch();
  const { handleSubmit, register, reset } = useForm();

  const history = useHistory();
  const handleLink = (path: string) => history.push(path);
  const handleCreate = (data: Inputs) => {
    dispatch(createBlog(data));
    history.push("/");
  };

  return (
    <div className={styles.blogWrapper}>
      <form onSubmit={handleSubmit(handleCreate)} className={styles.form}>
        <p>タイトル</p>
        <TextField
          id="outlined-basic"
          className={styles.title}
          label="New Blog"
          variant="outlined"
          defaultValue={
            editState ? "Edit desune" : "タイトルをここにかきましょう！"
          }
          name="blogTitle"
          inputRef={register}
        />
        <p>テキスト</p>
        <TextField
          id="outlined-multiline-static"
          className={styles.text}
          label="Multiline"
          multiline
          rows={12}
          defaultValue={
            editState ? "Edit desune" : "内容をここにかきましょう！"
          }
          variant="outlined"
          name="blogText"
          inputRef={register}
        />
        <div className={styles.buttonWrapper}>
          <Button type="submit" className={styles.button}>
            記事を投稿
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
