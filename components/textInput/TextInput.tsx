import React from "react";
import styles from "./textInput.module.css"

type textInputProps = {
    placeholder: string,
    state: any,
    value: string,
    type?: string
}

const TextInput = ({placeholder, value, state, type="text"}: textInputProps) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        required
        placeholder={placeholder}
        type={type}
        id={placeholder}
        value={value}
        onChange={e => state(e.target.value)}
      />
      <label className={styles.label} htmlFor={placeholder}>
        {placeholder}
      </label>
    </div>
  );
};

export default TextInput;
