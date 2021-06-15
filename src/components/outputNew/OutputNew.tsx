import React from "react";
import Header from "../header/Header";
import TextField from "@material-ui/core/TextField";
import styles from "./OutputNew.module.scss";
import Button from "@material-ui/core/Button";

const OutputNew = () => {
  return (
    <>
      <Header />
      <div className={styles.newBlogWrapper}>
        <form className={styles.form} noValidate autoComplete="off">
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
            <Button className={styles.button} variant="contained">
              記事を投稿
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OutputNew;
