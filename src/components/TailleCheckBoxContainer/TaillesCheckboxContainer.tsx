import React from "react";
import styles from "./tailles_checkbox_container.module.css"
import { TailleType } from "../../../types/dashboard/TailleType";


const TaillesCheckboxContainer = ({
  tailles,
  state,
  setState,
}: {
  tailles: TailleType[];
  state: any;
  setState: any;
}) => {
  return <div>{tailles.map((taille) => {
    const change = (selected: boolean) => {
        if(selected){
            let taillesSelected = state;
            taillesSelected.push(taille.taille_uid)
            setState(taillesSelected)
        }else{
            let taillesSelected = state;
            taillesSelected.pop(taille.taille_uid);
            setState(taillesSelected);
        }
    }
    return (
            <div key={taille.taille_uid} className={styles.checkbox_container}>
            <input id={taille.taille_uid} type="checkbox" onChange={(e) => change(e.target.checked)} />
            <label htmlFor={taille.taille_uid}>{taille.value}</label>
          </div>
        )
  })}</div>;
};

export default TaillesCheckboxContainer;
