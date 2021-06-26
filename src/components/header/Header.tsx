import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./Header.module.scss";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getIsAdmin } from "../../features/user/userSlice";
import {
  resetTmpTitleAndText,
  toggleEditState,
} from "../../features/blog/blogSlice";

type Inputs = {
  edit?: boolean;
};
const Header: React.FC<Inputs> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isAdmin = useSelector(getIsAdmin);

  const handleBlogCreate = () => {
    const path = "/blog/new";
    history.push(path);
  };
  const transitionToRootPath = () => {
    dispatch(toggleEditState(false));
    dispatch(resetTmpTitleAndText(""));
    history.push("/");
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.titleWrapper} onClick={transitionToRootPath}>
        <div className={styles.title}>
          {isAdmin ? "Dash Board" : "Output Blog"}
        </div>
      </div>
      {location.pathname === "/" ? (
        <Button
          variant="contained"
          className={styles.button}
          onClick={handleBlogCreate}
        >
          <NoteAddIcon className={styles.icon} />
          記事作成
        </Button>
      ) : null}
    </div>
  );
};

export default Header;
