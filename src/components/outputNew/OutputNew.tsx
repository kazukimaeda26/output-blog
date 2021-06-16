import React from "react";
import Header from "../header/Header";
import TextField from "@material-ui/core/TextField";
import styles from "./OutputNew.module.scss";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createBlog } from "../../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

type Inputs = {
  blogTitle: string;
  blogText: string;
};

const OutputNew = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, reset } = useForm();

  const history = useHistory();
  const handleLink = (path: string) => history.push(path);
  const handleCreate = (data: Inputs) => {
    dispatch(createBlog(data));
    history.push("/");
  };

  return (
    <>
      <Header />
      <div className={styles.newBlogWrapper}>
        <form onSubmit={handleSubmit(handleCreate)} className={styles.form}>
          <p>タイトル</p>
          <TextField
            id="outlined-basic"
            className={styles.title}
            label="New Blog"
            variant="outlined"
            defaultValue={"default value"}
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
            defaultValue="Default Value"
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
    </>
  );
};

export default OutputNew;
