import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./BlogForm.module.scss";
import {
  createBlog,
  updateBlog,
  getSelectedBlog,
  getEditState,
} from "../../features/blog/blogSlice";

interface Inputs {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
}

interface paramTypes {
  blogId: string;
}

const BlogForm: React.FC = () => {
  const blog = useSelector(getSelectedBlog);
  const editState = useSelector(getEditState);

  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const history = useHistory();
  const handleCreate = (data: Inputs) => {
    dispatch(createBlog(data));
    history.push("/");
  };

  const { blogId } = useParams<paramTypes>();

  const handleEdit = (data: Inputs) => {
    const sendData = { ...data, blogId: blogId };
    dispatch(updateBlog(sendData));
    history.push("/");
  };

  return (
    <form
      onSubmit={
        editState ? handleSubmit(handleEdit) : handleSubmit(handleCreate)
      }
      className={styles.form}
    >
      <div className={styles.blogWrapper}>
        <div className={styles.inputWrapper}>
          <TextField
            id="outlined-basic"
            className={styles.title}
            label="New Blog"
            variant="outlined"
            defaultValue={
              editState ? blog.title : "タイトルをここにかきましょう！"
            }
            name="blogTitle"
            inputRef={register}
          />
          <TextField
            id="outlined-multiline-static"
            className={styles.text}
            label="Multiline"
            multiline
            rows={20}
            defaultValue={editState ? blog.text : "内容をここにかきましょう！"}
            variant="outlined"
            name="blogText"
            inputRef={register}
          />
        </div>
        <div className={styles.writtenCharaWrapper}>
          <div className={styles.title}>title ga kokoni</div>
          <div className={styles.text}>text ga kokoni</div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        {editState ? (
          <Button type="submit" className={styles.button}>
            記事を更新
          </Button>
        ) : (
          <Button type="submit" className={styles.button}>
            記事を投稿
          </Button>
        )}
      </div>
    </form>
  );
};

export default BlogForm;
