import React from "react";
import styles from "./loading.module.css";
import 'animate.css'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={`${styles.point_container} animate__animated animate__infinite animate__rubberBand`}>
        <div className={styles.point}></div>
        <div className={styles.point}></div>
        <div className={styles.point}></div>
      </div>
    </div>
  );
};

export default Loading;
