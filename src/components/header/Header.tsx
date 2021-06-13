import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./Header.module.scss";
import CreateIcon from "@material-ui/icons/Create";
import { CountUp, bbb } from "../../features/blog/blogSlice";
import { useDispatch } from "react-redux";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const aaa = () => {
    dispatch(bbb(true));
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.title}>Dash Board</div>
      <Button variant="contained" className={styles.button} onClick={aaa}>
        <CreateIcon className={styles.icon} />
        記事作成
      </Button>
    </div>
  );
};

export default Header;
