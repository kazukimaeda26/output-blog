import React from "react";
import Routing from "./Routing";
import styles from "./App.module.scss";
import { auth } from "./firebase";

const App: React.FC = () => {
  console.log(auth);
  return (
    <div className={styles.root}>
      <Routing />
    </div>
  );
};

export default App;
