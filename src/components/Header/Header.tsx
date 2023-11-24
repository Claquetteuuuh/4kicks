    import React, { useEffect, useState } from 'react';
import TextInput from '../TextInput/TextInput';
import axios from 'axios';
import styles from "./header.module.css"
import { useRouter } from 'next/navigation';
import { ButtonSeConnecter } from '../Button/ButtonSeConnecter/ButtonSeConnecter';
import { ButtonMarketplace } from '../Button/ButtonMarketplace/ButtonMarketplace';
import { ButtonPanier } from '../Button/ButtonPanier/ButtonPanier';
import { ButtonFavoris } from '../Button/ButtonFavoris/ButtonFavoris';
import SelectLang from '../Select/SelectLang/SelectLang';
import { userType } from "../../../types/global/UserType";
import { useSearchParams } from "next/navigation";
import { ArticlesType } from "../../../types/home/Article";


export default function Header({ user }: { user: userType }) {

    const router = useRouter();
    const parametre = useSearchParams();
    
    const [motCles, setmotCles] = useState<string>("");

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.push(`/?mot=${motCles}`);
    }  

    const [dataSearch, setdataSearch] = useState<ArticlesType[]>([]);

    useEffect(() => {
        if (parametre?.get("mot")) {
          axios
            .get(`/api/recherches?mot=${parametre?.get("mot")}`)
            .then((e) => {
                console.log(e)
              setdataSearch(e.data);
            })
            .catch((err) => {
              console.log("ok");
              console.error(err);
            });
        } else {
          axios
            .get(`/api/recherches`)
            .then((e) => {
              setdataSearch(e.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, [parametre?.get("mot")]);

    return <header className={styles.container}>
        <img src="/imgs/logo.png" alt="logo" className={styles.logo} />
        <div className={styles.search}>
            <form onSubmit={handleForm}>
                <TextInput placeholder='Rechercher...' state={motCles} setState={setmotCles} className={styles.text_input}/>
                
            </form>
        </div>
        <div className={styles.article_container}>
          {dataSearch ? (
            dataSearch.map((item: ArticlesType) => {
              return (
                <div key={item.productUID} className={styles.container}>
                  <div className={styles.container_name}>
                    <h1 className={styles.article_name}>{item.nameProduct}</h1>
                  </div>
                  <div className={styles.container_image}>
                    <img
                      src={item.imageLien}
                      alt="image de chaussure"
                      className={styles.article_image}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p>Pas de donnee</p>
          )}
        </div>

        <ButtonSeConnecter className={styles.bouton_connecter}/>
        <ButtonMarketplace className={styles.bouton_marketplace}/>
        <ButtonPanier className={styles.bouton_panier}/>
        <ButtonFavoris className={styles.bouton_favoris}/>
        <SelectLang className={styles.selectLang}/>

        <hr className={styles.separateur}/>
    </header>
}