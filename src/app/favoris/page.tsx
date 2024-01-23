"use client"
import React, { useEffect, useState } from 'react';
import { userType } from '../../../types/global/UserType';
import axios from 'axios';
import { ProduitType } from '../../../types/home/Produit';
import CheckAccountLayout from '@/components/checkAccountLayout/CheckAccountLayout';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import ProductFavoris from '@/components/ProductFavoris/ProductFavoris';
import styles from "./page.module.css"
import Loading from '@/components/Loading/Loading';
import PlainButton from '@/components/plainButton/plainButton';


export default function Recherche({ params }: { params: { user: userType } }) {
    const [favoris, setFavoris] = useState<ProduitType[]>([]);
    const [recom, setRecom] = useState<ProduitType[]>([]);


    useEffect(() => {
        if (favoris.length === 0) {
            axios
                .get(`/api/favoris?userID=${params.user.user_id}`)
                .then((response) => {
                    console.log(response);
                    setFavoris(response.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [favoris])

    useEffect(() => {
        if (recom.length > 0) {
            axios
                .get(`/api/recommandations-favoris?userID=${params.user?.user_id}`)
                .then((response) => {
                    console.log(response)
                    setRecom(response.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    })




    return (
        <CheckAccountLayout user={params.user}>
            <div className={styles.container}>
                {
                    favoris.length > 0 ? (
                        <ProductFavoris allProducts={favoris} name="Favoris" />
                    ) :
                        (
                            <div className={styles.panier_vide}>
                                <p className={styles.vide}>Vos favoris sont vide</p>
                                <PlainButton text="Je veux dépenser" onClick={() => window.location.href = "/"} />
                            </div>
                        )
                };
                <ProductCategories allProducts={recom} name="Découverte" />
            </div>:

        </CheckAccountLayout>
    );
}   
