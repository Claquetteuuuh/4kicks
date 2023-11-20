import React from "react";
import styles from "./textInput.module.css"

type textInputProps = {
    placeholder: string,
    setState: any,
    state: string,
    type?: string,
    len?: number,
    required?: boolean,
    classname?: string,
}

const TextInput = ({placeholder, state, setState, type="text", len, required=false, classname}: textInputProps) => {
  return (
    <div className={`${styles.container} ${classname}`}>
      <input
        autoComplete="true"
        className={styles.input}
        required={required}
        placeholder={placeholder}
        type={type}
        id={placeholder}
        value={state}
        onChange={e => setState(e.target.value)}
        minLength={len}
      />
      <label className={styles.label} htmlFor={placeholder}>
        {placeholder}
      </label>
    </div>
  );
};

export default TextInput;
