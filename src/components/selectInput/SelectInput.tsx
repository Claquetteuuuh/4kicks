import { useState } from "react";
import { Combobox } from "@headlessui/react";
import styles from "./selectInput.module.css";

type selectInputProps = {
  elements: string[];
  setState: any;
  state: string;
  placeholder: string;
};

export default function SelectInput({
  elements,
  setState,
  state,
  placeholder,
}: selectInputProps) {
  const [query, setQuery] = useState("");

  const filteredElements =
    query === ""
      ? elements
      : elements.filter((thing) => {
          return thing.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={styles.container}>
      <Combobox value={state} onChange={setState}>
        <Combobox.Input id={placeholder}
          className={styles.input}
          onChange={(event) => setQuery(event.target.value)}
        />
        <label className={styles.label} htmlFor={placeholder}>
          {placeholder}
        </label>
        <Combobox.Options className={styles.options} >
          {filteredElements.length === 0 && query !== '' ? (
                <div className={styles.element}>
                  Rien trouvé.
                </div>
              ) : ( filteredElements.map((thing) => (
            <Combobox.Option key={thing} value={thing} className={({ active }) =>
            `${
              active ? styles.active + " " + styles.element : styles.element
            }`}>
              {thing}
            </Combobox.Option>
          )))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
