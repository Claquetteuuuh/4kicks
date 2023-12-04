import React from "react";
import styles from "./plainButton.module.css";

type connButtonProps = {
  img?: string,
  imgAlt?: string,
  text: string,
  color?: string,
  type?:  undefined | "submit" | "reset" | "button",
  onClick?: any,
  className?: string
};
const PlainButton = ({ img, imgAlt, text, color="primary", type="button", onClick, className }: connButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={`${styles.connectionButton} ${(color == "primary")? styles.primaryColor : styles.otherColor} ${className}`}>
      {img ? <img src={img} alt={imgAlt} /> : false}
      <p>{text}</p>
      {img ? <p className={styles.ghost}></p> : false}
    </button>
  );
};

export default PlainButton;
