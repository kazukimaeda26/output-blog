import React from "react";
import marked from "marked";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Header from "../header/Header";
import { getSelectedBlog } from "../../features/blog/blogSlice";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./BlogShow.module.scss";

const BlogShow: React.FC = () => {
  const selectedBlog = useSelector(getSelectedBlog);
  const { handleSubmit, register } = useForm();

  const handleCreate = async () => {
    await createComment();
  };
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <p>
            {selectedBlog.updatedAt === ""
              ? `${selectedBlog.createdAt}に作成`
              : `${selectedBlog.updatedAt}に更新`}
          </p>
          <h1 className={styles.title}>
            <span
              dangerouslySetInnerHTML={{ __html: marked(selectedBlog.title) }}
            />
          </h1>
        </div>
        <div className={styles.text}>
          <span
            dangerouslySetInnerHTML={{ __html: marked(selectedBlog.text) }}
          />
        </div>
      </div>
      <div className={styles.commentWrapper}>
        <div className={styles.commentLists}>
          <p className={styles.paragraph}>コメント一覧</p>
          <div className={styles.commentList}>仮コメント１</div>
          <div className={styles.commentList}>仮コメント２</div>
          <div className={styles.commentList}>仮コメント３</div>
        </div>
        <p>コメントを投稿する</p>
        <form
          onSubmit={handleSubmit(handleCreate)}
          className={styles.commentForm}
        >
          <div className={styles.commentTextArea}>
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            className={styles.commentButton}
          >
            投稿する
          </Button>
        </form>
      </div>
    </>
  );
};

export default BlogShow;
