"use client"
import SearchBar from '@/components/SearchBar/TextInput';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AfficheType } from '../../types/home/Affiche';
import Layout from '@/components/Layout/Layout';
import Header from '@/components/Header/Header';
import { useSearchParams } from 'next/navigation';
import { ArticlesType } from '../../types/home/Article';

export default function Home() {

    const [affiches, setAffiches] = useState<AfficheType>()

    const params = useSearchParams();


    useEffect(() => {
        console.log(params.get("article"))

        axios.get(`/api/recherches?mot=${params.get("mot")}`)
            .then(e => {
                setdataSearch(e.data.recherches)
            })
            .catch(err => {

            })
        

    }, [params])

    const [dataSearch, setdataSearch] = useState<ArticlesType[]>([]);


    if (dataSearch) {

    }

    // useEffect(() => {
    //     axios.get("/api/affiches")
    //         .then(e => {
    //             setAffiches(e.data.affiches)
    //         })
    //         .catch(err => {

    //         })
    // }, [])

    return (
        <Layout>
            <Header />
            {
                (dataSearch) ?
                    dataSearch.map((item: ArticlesType) => {
                        // Assurez-vous d'adapter cela en fonction de la structure réelle de vos données
                        return (
                            <div>
                                <h1>{item.nameProduct}</h1>
                                <img src={item.imageLien} alt="" />
                            </div>
                        )
                    })
                    :
                    <p>Pas de donnee</p>
            }
        </Layout>
    )
};