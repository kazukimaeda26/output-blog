import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routing from "./Routing";
import styles from "./App.module.scss";
import { fetchBlogs } from "./features/blog/blogSlice";
import { AppDispatch } from "./app/store";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      dispatch(fetchBlogs());
    };
    getData();
  }, []);
  return (
    <div className={styles.root}>
      <Routing />
    </div>
  );
};

export default App;
