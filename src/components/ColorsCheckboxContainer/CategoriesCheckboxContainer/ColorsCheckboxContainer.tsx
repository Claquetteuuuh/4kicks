import React from "react";
import styles from "./colors_checkbox_container.module.css"
import { ColorType } from "../../../../types/dashboard/ColorType";

const ColorsCheckboxContainer = ({
  colors,
  state,
  setState,
}: {
  colors: ColorType[];
  state: any;
  setState: any;
}) => {
  return <div>{colors.map((color) => {
    const change = (selected: boolean) => {
        if(selected){
            let colorsSelected = state;
            colorsSelected.push(color.color_uid)
            setState(colorsSelected)
        }else{
            let colorsSelected = state;
            colorsSelected.pop(color.color_uid);
            setState(colorsSelected);
        }
    }
    return (
            <div key={color.color_uid} className={styles.checkbox_container}>
                <input id={color.color_uid} type="checkbox" onChange={(e) => change(e.target.checked)} />
                <label htmlFor={color.color_uid}>{color.value}</label>
            </div>
        )
  })}</div>;
};

export default ColorsCheckboxContainer;
