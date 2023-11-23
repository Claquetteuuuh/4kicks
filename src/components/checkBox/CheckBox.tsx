import React from 'react';
import styles from "./checkBox.module.css";

type checkBoxProps = {
    text: string,
    state: boolean,
    setState: any,
    placeholder: string,
    required?: boolean
}

const CheckBox = ({text, state, setState, placeholder, required}: checkBoxProps) => {
    return (
        <div className={styles.checkBox}>
            <input required={required} type="checkbox" id={placeholder} checked={state} onChange={e => setState(e.target.checked)}/>
            <label htmlFor={placeholder}>{text}</label>
        </div>
    );
};

export default CheckBox;