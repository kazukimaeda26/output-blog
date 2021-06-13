import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./Header.module.scss";
import CreateIcon from "@material-ui/icons/Create";

const Header: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.title}>Dash Board</div>
      <Button variant="contained" className={styles.button}>
        <CreateIcon className={styles.icon} />
        記事作成
      </Button>
    </div>
  );
};

export default Header;
