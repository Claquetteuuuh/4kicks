import React, { useState } from 'react';
import styles from "./SelectLang.module.css"

type SelectLangProps = {
  className?: string
}

const SelectLang = ({className}: SelectLangProps) => {

    const [choixDrapeau, setChoixDrapeau] = useState('fr'); 
  
    const handleChange = () => {
        if(choixDrapeau === 'fr'){
          setChoixDrapeau('en')
        }
        if(choixDrapeau === 'en'){
          setChoixDrapeau('fr')
        }
    };

    return (
      <div className={`${styles.container} ${className}`}>
      <div className={styles.container_image}>
        <button onClick={handleChange}>
        <img
            src={choixDrapeau === 'fr' ? '/imgs/drapeau_francais.png' : '/imgs/drapeau_americain.png'}
            alt={choixDrapeau === 'fr' ? 'Drapeau français' : 'Drapeau anglais'}
            className={styles.img}
          />
        </button>
      </div>
      </div>
    );
  };
  
  export default SelectLang;
