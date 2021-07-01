import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./Header.module.scss";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  const isAdmin = useSelector(getIsAdmin);

  const transitionToRootPath = () => {
    dispatch(toggleEditState(false));
    dispatch(resetTmpTitleAndText(""));
    history.push("/");
  };

  const transitionToAdminSignInPath = () => {
    history.push("/admin-auth");
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.titleWrapper} onClick={transitionToRootPath}>
        <div className={styles.title}>
          {isAdmin ? "Dash Board" : "Output Blog"}
        </div>
      </div>
      {isAdmin ? (
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => console.log("adminである")}
        >
          管理者画面へ
        </Button>
      ) : (
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => transitionToAdminSignInPath()}
        >
          <LockOpenRoundedIcon />
          管理者としてログイン
        </Button>
      )}
    </div>
  );
};

export default Header;
