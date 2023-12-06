"use client"
import React from "react";
import styles from "./TextInput.module.css"

type textInputProps = {
    placeholder: string,
    setState: any,
    state: string,
    type?: string,
    len?: number,
    required?: boolean,
    className?: string,
}

const TextInput = ({placeholder, state, setState, type="text", len, required=false, className}: textInputProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
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
