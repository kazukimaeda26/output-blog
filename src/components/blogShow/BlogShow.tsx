import React from "react";
import marked from "marked";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Header from "../header/Header";
import {
  getSelectedBlog,
  countUpLikes,
  updateLikesNum,
} from "../../features/blog/blogSlice";
import {
  createComment,
  allComments,
  fetchComments,
} from "../../features/comment/commentSlice";
import styles from "./BlogShow.module.scss";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

type Inputs = {
  text: string;
};

type InputsNum = {
  id: string;
  likes: number;
};

const BlogShow: React.FC = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  const selectedBlog = useSelector(getSelectedBlog);
  const comments = useSelector(allComments);

  const blog_id = selectedBlog.id;

  const handleCreate = async (data: Inputs) => {
    await createComment(blog_id, data.text);
    dispatch(fetchComments(blog_id));
    reset();
  };

  const handleCountUp = async (id: string, likes: number) => {
    await updateLikesNum(selectedBlog.id, selectedBlog.likes + 1);
    dispatch(countUpLikes(""));
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
        <div className={styles.thumbUpAltWrapper}>
          <button
            className={styles.button}
            onClick={() => handleCountUp(selectedBlog.id, selectedBlog.likes)}
          >
            <p className={styles.para}>イイネ！</p>
            <ThumbUpAltIcon className={styles.thumbUpAltIcon} />
          </button>
          <p className={styles.num}>{selectedBlog.likes}</p>
        </div>
      </div>
      <div className={styles.commentWrapper}>
        <div className={styles.commentLists}>
          <p className={styles.paragraph}>コメント</p>
          {comments.map((comment) => (
            <div className={styles.commentList}>{comment.text}</div>
          ))}
        </div>
        <p>コメントを投稿する</p>
        <form
          onSubmit={handleSubmit(handleCreate)}
          className={styles.commentForm}
        >
          <div className={styles.commentTextArea}>
            <TextField
              name="text"
              inputRef={register}
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
            />
          </div>
          <Button
            type="submit"
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
