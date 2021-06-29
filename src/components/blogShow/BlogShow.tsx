import React from "react";
import marked from "marked";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Header from "../header/Header";
import {
  getSelectedBlog,
  countUpLikes,
  countDownLikes,
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
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import FavoriteIcon from "@material-ui/icons/Favorite";

type Inputs = {
  text: string;
  nickname: string;
};

const BlogShow: React.FC = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  const selectedBlog = useSelector(getSelectedBlog);
  const comments = useSelector(allComments);

  const blog_id = selectedBlog.id;

  const handleCreate = async (data: Inputs) => {
    await createComment(blog_id, data.text, data.nickname);
    dispatch(fetchComments(blog_id));
    reset();
  };

  const handleCountUp = async (id: string, likes: number) => {
    await updateLikesNum(selectedBlog.id, selectedBlog.likes + 1);
    dispatch(countUpLikes(""));
  };
  const handleCountDown = async (id: string, likes: number) => {
    await updateLikesNum(selectedBlog.id, selectedBlog.likes - 1);
    dispatch(countDownLikes(""));
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
        <div className={styles.buttonWrapper}>
          <div className={styles.thumbUpAltWrapper}>
            <button
              className={styles.button}
              onClick={() => handleCountUp(selectedBlog.id, selectedBlog.likes)}
            >
              <p className={styles.para}>イイネ！</p>
              <ThumbUpAltIcon className={styles.thumbUpAltIcon} />
            </button>
          </div>
          <div className={styles.thumbDownAltWrapper}>
            <button
              className={styles.button}
              onClick={() =>
                handleCountDown(selectedBlog.id, selectedBlog.likes)
              }
            >
              <p className={styles.para}>ヨクナイネ！</p>
              <ThumbDownAltIcon className={styles.thumbDownAltIcon} />
            </button>
            <p className={styles.num}>
              <FavoriteIcon className={styles.favoriteIcon} />
              {selectedBlog.likes}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.commentWrapper}>
        <div className={styles.commentListsAndPostCommentWrapper}>
          <div className={styles.commentLists}>
            <p className={styles.paragraph}>コメント</p>
            {comments.map((comment) => (
              <>
                <div className={styles.commentList}>
                  <div>
                    <span className={styles.user}>
                      {comment.nickname === "" ? "匿名さん" : comment.nickname}
                    </span>{" "}
                    さんより：
                  </div>
                  <div className={styles.date}>{comment.createdAt}</div>
                  <div className={styles.text}>{comment.text}</div>
                </div>
              </>
            ))}
          </div>
          <p className={styles.postComment}>コメントを投稿する</p>
          <form
            onSubmit={handleSubmit(handleCreate)}
            className={styles.commentForm}
          >
            <div className={styles.nickname}>
              <TextField
                name="nickname"
                inputRef={register}
                id="outlined-basic"
                label="ニックネーム（匿名でもコメント可能です）"
                variant="outlined"
              />
            </div>
            <div className={styles.comment}>
              <TextField
                name="text"
                inputRef={register}
                id="outlined-multiline-static"
                label="コメントをどうぞ"
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
              className={styles.button}
            >
              投稿する
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogShow;
