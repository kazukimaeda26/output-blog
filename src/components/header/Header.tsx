import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./Header.module.scss";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <Link to="/" className={styles.titleWrapper}>
        <div className={styles.title}>Dash Board</div>
      </Link>
      <Link to="blog/new" className={styles.link}>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => console.log("aaa")}
        >
          <CreateIcon className={styles.icon} />
          記事作成
        </Button>
      </Link>
    </div>
  );
};

export default Header;
