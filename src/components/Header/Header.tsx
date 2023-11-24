import React, { useEffect, useState } from 'react';
import TextInput from '../TextInput/TextInput';
import axios from 'axios';
import styles from "./header.module.css"
import { useRouter } from 'next/navigation';
import { ButtonSeConnecter } from '../Button/ButtonSeConnecter';
import { ButtonMarketplace } from '../Button/ButtonMarketplace';
import { ButtonPanier } from '../Button/ButtonPanier';
import { ButtonFavoris } from '../Button/ButtonFavoris';


export default function Header() {

    const router = useRouter();
    
    const [motCles, setmotCles] = useState<string>("");

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.push(`/?mot=${motCles}`);
    }  

    return <header className={styles.container}>
        <img src="/imgs/logo.png" alt="logo" className={styles.logo} />
        <div className={styles.search}>
            <form onSubmit={handleForm}>
                <TextInput placeholder='Rechercher...' state={motCles} setState={setmotCles} />
                <button type='submit'>ok</button>
            </form>
        </div>
        <ButtonSeConnecter />
        <ButtonMarketplace />
        <ButtonPanier />
        <ButtonFavoris />
    </header>
}