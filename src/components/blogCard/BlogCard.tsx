import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import noImage from "../../images/noImage.jpg";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { selectBlog } from "../../features/blog/blogSlice";
import { fetchComments } from "../../features/comment/commentSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    image: {
      width: 140,
      height: 140,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  })
);

interface propType {
  blog: {
    id: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
  };
}

const BlogCard: React.FC<propType> = ({ blog }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  let text = blog.text;
  if (text.length > 40) text = text.substr(0, 37) + "...";

  const addSelectedBlogAndTransition = () => {
    dispatch(
      selectBlog({
        id: blog.id,
        title: blog.title,
        text: blog.text,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        likes: blog.likes,
      })
    );
    const blog_id = blog.id;
    dispatch(fetchComments(blog_id));
    history.push(`/blog/${blog.id}`);
  };

  return (
    <div
      className={classes.root}
      onClick={() => addSelectedBlogAndTransition()}
    >
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={noImage} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {blog.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {text}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {blog.updatedAt !== ""
                    ? `作成日：${blog.updatedAt}`
                    : `最終更新日：${blog.createdAt}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  {`コメント数：仮10000件`}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <FavoriteIcon />
                {blog.likes}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default BlogCard;
