import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./Header.module.scss";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { toggleEditState, getEditState } from "../../features/blog/blogSlice";

type Inputs = {
  edit?: boolean;
};
const Header: React.FC<Inputs> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const editState = useSelector(getEditState);

  const handleBlogCreate = () => {
    const path = "/blog/new";
    history.push(path);
  };
  const transitionToRootPath = () => {
    dispatch(toggleEditState(false));
    history.push("/");
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.titleWrapper} onClick={transitionToRootPath}>
        <div className={styles.title}>Dash Board</div>
      </div>
      {editState ? null : (
        <Button
          variant="contained"
          className={styles.button}
          onClick={handleBlogCreate}
        >
          <NoteAddIcon className={styles.icon} />
          記事作成
        </Button>
      )}
    </div>
  );
};

export default Header;
