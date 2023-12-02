import React from "react";
import { CategorieType } from "../../../types/dashboard/CategorieType";
import styles from "./categories_checkbox_container.module.css"

const CategoriesCheckboxContainer = ({
  categories,
  state,
  setState,
}: {
  categories: CategorieType[];
  state: any;
  setState: any;
}) => {
  return <div>{categories.map((categorie) => {
    const change = (selected: boolean) => {
        if(selected){
            let categoriesSelected = state;
            categoriesSelected.push(categorie.categorie_uid)
            setState(categoriesSelected)
        }else{
            let categoriesSelected = state;
            categoriesSelected.pop(categorie.categorie_uid);
            setState(categoriesSelected);
        }
    }
    return (
            <div key={categorie.categorie_uid} className={styles.checkbox_container}>
                <input id={categorie.categorie_uid} type="checkbox" onChange={(e) => change(e.target.checked)} />
                <label htmlFor={categorie.categorie_uid}>{categorie.name}</label>
            </div>
        )
  })}</div>;
};

export default CategoriesCheckboxContainer;
