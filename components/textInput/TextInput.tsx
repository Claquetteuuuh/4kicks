import React from "react";
import styles from "./textInput.module.css"

type textInputProps = {
    placeholder: string,
    setState: any,
    state: string,
    type?: string
    len?: number
}

const TextInput = ({placeholder, state, setState, type="text", len}: textInputProps) => {
  return (
    <div className={styles.container}>
      <input
        autoComplete="true"
        className={styles.input}
        required
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
