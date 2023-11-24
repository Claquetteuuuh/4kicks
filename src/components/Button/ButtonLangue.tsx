import React, { useState } from 'react';
import styles from "./ButtonMarketplace.module.css"


const BoutonDrapeau = () => {
    // État pour suivre le choix de l'utilisateur
    const [choixDrapeau, setChoixDrapeau] = useState('fr'); // 'fr' pour le drapeau français par défaut
  
    const handleChange = (event: any) => {
      setChoixDrapeau(event.target.value);
    };

    return (
      <div>
        <select value={choixDrapeau} onChange={handleChange}>
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
        </select>
  
        <div style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
          <img
            src={choixDrapeau === 'fr' ? '/chemin/vers/drapeau-francais.png' : '/chemin/vers/drapeau-anglais.png'}
            alt={choixDrapeau === 'fr' ? 'Drapeau français' : 'Drapeau anglais'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    );
  };
  
  export default BoutonDrapeau;
