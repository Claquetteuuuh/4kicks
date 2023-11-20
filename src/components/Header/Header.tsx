import React, { useEffect, useState } from 'react';
import TextInput from '../SearchBar/TextInput';
import axios from 'axios';
import styles from "./header.module.css"
import { useRouter } from 'next/navigation';


export default function Layout() {

    const router = useRouter();
    
    const [motCles, setmotCles] = useState<string>("");

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.push(`/?mot=${motCles}`);
    }  

    return <header className={styles.container}>
        <div className={styles.search}>
            <form onSubmit={handleForm}>
                <TextInput placeholder='Rechercher...' state={motCles} setState={setmotCles} className={styles.searchBar} />
                <button type='submit'>ok</button>
            </form>
        </div>
    </header>
}