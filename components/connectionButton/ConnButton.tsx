import React from "react";
import styles from "./connButton.module.css";

type connButtonProps = {
  img?: string,
  imgAlt?: string,
  text: string,
  color?: string,
};
const ConnButton = ({ img, imgAlt, text, color="primary" }: connButtonProps) => {
  return (
    <div className={`${styles.connectionButton} ${(color == "primary")? styles.primaryColor : styles.otherColor}`}>
      {img ? <img src={img} alt={imgAlt} /> : false}
      <p>{text}</p>
      {img ? <p className={styles.ghost}></p> : false}
    </div>
  );
};

export default ConnButton;
