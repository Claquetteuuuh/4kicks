"use client"
import SearchBar from '@/components/TextInput/TextInput';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AfficheType } from '../../types/home/Affiche';
import Layout from '@/components/Layout/Layout';
import Header from '@/components/Header/Header';
import { useSearchParams } from 'next/navigation';
import { ArticlesType } from '../../types/home/Article';
import styles from './main_page.module.css';
import { ButtonSeConnecter } from '@/components/Button/ButtonSeConnecter/ButtonSeConnecter';
import { ButtonMarketplace } from '@/components/Button/ButtonMarketplace/ButtonMarketplace';

export default function Home() {
    
    const [dataSearch, setdataSearch] = useState<ArticlesType[]>([]);
    const [affiches, setAffiches] = useState<AfficheType>()

    const params = useSearchParams();


    useEffect(() => {
        if(params?.get("mot")){
            axios.get(`/api/recherches?mot=${params?.get("mot")}`)
            .then(e => {
                setdataSearch(e.data)
            })
            .catch(err => {
                console.log("ok");
                console.error(err)
            })
        }else{
            axios.get(`/api/recherches`)
            .then(e => {
                setdataSearch(e.data)
            })
            .catch(err => {
                console.error(err)
            })
        }

    }, [params?.get("mot")])


    return (
        <Layout>
            <div className={styles.container_header}>
                <Header />
            </div>
            <div className={styles.article_container}>
            {
                (dataSearch) ?
                    dataSearch.map((item: ArticlesType) => {
                        // Assurez-vous d'adapter cela en fonction de la structure réelle de vos données
                        return (
                            <div key={item.productUID} className={styles.container}>
                                <div className={styles.container_name}>
                                    <h1 className={styles.article_name}>{item.nameProduct}</h1>
                                </div>
                                <div className={styles.container_image}>
                                    <img src={item.imageLien} alt="image de chaussure" className={styles.article_image}/>
                                </div>
                            </div>
                        )
                    })
                    :
                    <p>Pas de donnee</p>
            }
            </div>
        </Layout>
    )
};