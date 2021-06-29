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

import { AppDispatch } from "../../app/store";
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
  fetchBlogs,
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
  const selectedBlog = useSelector(getSelectedBlog);
  const editState = useSelector(getEditState);
  const tmpBlog = useSelector(getTmpBlog);

  const dispatch: AppDispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const history = useHistory();

  const handleCreate = async () => {
    await createBlog(tmpBlog.tmpTitle, tmpBlog.tmpText);
    dispatch(resetTmpTitleAndText(""));
    dispatch(fetchBlogs());
    history.push("/admin-home");
  };
  const handleEdit = async (data: Inputs) => {
    const sendData = {
      ...selectedBlog,
      title: tmpBlog.tmpTitle,
      text: tmpBlog.tmpText,
    };
    await updateBlog(sendData);
    dispatch(resetTmpTitleAndText(""));
    dispatch(fetchBlogs());
    history.push("/admin-home");
  };
  const handleTitleChange = (input: string) => {
    dispatch(changeTmpTitle(input));
  };
  const handleTextChange = (input: string) => {
    dispatch(changeTmpText(input));
  };

  function handleDrop(data: any, e: any) {
    let files = e.dataTransfer.files;
    if (files.length > 0) {
      let file = files[0];
      alert("FileName : " + file.name);
    }
  }

  return (
    <>
      <form
        onSubmit={
          editState ? handleSubmit(handleEdit) : handleSubmit(handleCreate)
        }
        className={styles.form}
      >
        <div className={styles.titleWrapper}>
          <div className={styles.leftTitleWrapper}>
            <TextField
              id="title"
              className={styles.leftTitle}
              label="タイトル"
              variant="outlined"
              defaultValue={editState ? selectedBlog.title : ""}
              name="blogTitle"
              inputRef={register}
              onChange={(event) => handleTitleChange(event.target.value)}
            />
          </div>
          <div className={styles.rightTitleWrapper}>
            <span
              dangerouslySetInnerHTML={{ __html: marked(tmpBlog.tmpTitle) }}
            />
          </div>
        </div>

        <div className={styles.textWrapper}>
          <div className={styles.leftTextWrapper}>
            <SimpleMDE
              onChange={(e) => handleTextChange(e)}
              events={{ drop: handleDrop }}
              className={styles.text}
              value={tmpBlog.tmpText}
            />
          </div>
          <div className={styles.rightTextWrapper}>
            <span
              dangerouslySetInnerHTML={{ __html: marked(tmpBlog.tmpText) }}
            />
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
