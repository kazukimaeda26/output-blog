import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import marked from "marked";

import styles from "./BlogForm.module.scss";
import {
  createBlog,
  updateBlog,
  getSelectedBlog,
  getEditState,
  changeTmpTitle,
  changeTmpText,
  getTmpBlog,
  resetTmpTitleAndText,
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
  const tmpBlog = useSelector(getTmpBlog);

  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const { blogId } = useParams<paramTypes>();

  const history = useHistory();

  const handleCreate = () => {
    const sendData = { blogTitle: tmpBlog.tmpTitle, blogText: tmpBlog.tmpText };
    dispatch(createBlog(sendData));
    dispatch(resetTmpTitleAndText(""));
    history.push("/");
  };
  const handleEdit = (data: Inputs) => {
    const sendData = {
      blogId: blogId,
      blogTitle: tmpBlog.tmpTitle,
      blogText: tmpBlog.tmpText,
    };
    dispatch(updateBlog(sendData));
    dispatch(resetTmpTitleAndText(""));
    history.push("/");
  };
  const handleTitleChange = (input: string) => {
    dispatch(changeTmpTitle(input));
  };
  const handleTextChange = (input: string) => {
    dispatch(changeTmpText(input));
  };

  return (
    <>
      <form
        onSubmit={
          editState ? handleSubmit(handleEdit) : handleSubmit(handleCreate)
        }
        className={styles.form}
      >
        <div className={styles.blogWrapper}>
          <div className={styles.inputWrapper}>
            <TextField
              id="title"
              className={styles.title}
              label="タイトル"
              variant="outlined"
              defaultValue={editState ? blog.title : ""}
              name="blogTitle"
              inputRef={register}
              onChange={(event) => handleTitleChange(event.target.value)}
            />
            {/* <div className={styles.textWrapper}> */}
            <SimpleMDE
              onChange={(event) => handleTextChange(event)}
              className={styles.text}
              value={tmpBlog.tmpText}
            />
            {/* </div> */}

            {/* <TextField
              id="text"
              className={styles.text}
              label="Markdown記法が利用可能です。"
              multiline
              rows={20}
              defaultValue={editState ? blog.text : ""}
              variant="outlined"
              name="blogText"
              inputRef={register}
              onChange={(event) => handleTextChange(event.target.value)}
            /> */}
          </div>
          <div className={styles.writtenCharaWrapper}>
            <div className={styles.title} id="titleDOM">
              <span
                dangerouslySetInnerHTML={{ __html: marked(tmpBlog.tmpTitle) }}
              />
            </div>
            <div className={styles.text}>
              <span
                dangerouslySetInnerHTML={{ __html: marked(tmpBlog.tmpText) }}
              />
            </div>
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
    </>
  );
};

export default BlogForm;
