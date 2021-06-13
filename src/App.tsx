import React from "react";
import Routing from "./Routing";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <Routing />
    </div>
  );
};

export default App;
