import React from "react";
import Header from "../header/Header";
import TextField from "@material-ui/core/TextField";
import styles from "./OutputNew.module.scss";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createBlog } from "../../features/blog/blogSlice";

type Inputs = {
  blogTitle: string;
  blogText: string;
};

const OutputNew = () => {
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const handleCreate = (data: Inputs) => {
    dispatch(createBlog(data));
  };
  return (
    <>
      <Header />
      <div className={styles.newBlogWrapper}>
        <form
          onSubmit={handleSubmit(handleCreate)}
          className={styles.form}
          autoComplete="off"
          action="/"
        >
          <p>タイトル</p>
          <TextField
            id="outlined-basic"
            className={styles.title}
            label="title"
            variant="outlined"
          />
          <p>テキスト</p>
          <TextField
            id="outlined-multiline-static"
            className={styles.text}
            label="Multiline"
            multiline
            rows={12}
            defaultValue="Default Value"
            variant="outlined"
          />
          <div className={styles.buttonWrapper}>
            <Button type="submit" className={styles.button} variant="contained">
              記事を投稿
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OutputNew;
