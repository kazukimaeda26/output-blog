import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./AdminHeader.module.scss";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { auth } from "../../firebase";
import { toggleIsAdmin } from "../../features/user/userSlice";
import {
  resetTmpTitleAndText,
  toggleEditState,
} from "../../features/blog/blogSlice";

type Inputs = {
  edit?: boolean;
};
const AdminHeader: React.FC<Inputs> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleBlogCreate = () => {
    const path = "/admin/blog/new";
    history.push(path);
  };
  const transitionToRootPath = () => {
    dispatch(toggleEditState(false));
    dispatch(resetTmpTitleAndText(""));
    history.push("/admin-home");
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      dispatch(toggleIsAdmin(false));
      history.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.titleWrapper} onClick={transitionToRootPath}>
        <div className={styles.title}>管理者画面</div>
      </div>
      <div className={styles.buttonWrapper}>
        {location.pathname === "/admin-home" ? (
          <Button
            variant="contained"
            className={styles.button}
            onClick={handleSignOut}
          >
            <MeetingRoomIcon />
            ログアウト
          </Button>
        ) : null}
        {location.pathname === "/admin-home" ? (
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
    </div>
  );
};

export default AdminHeader;
