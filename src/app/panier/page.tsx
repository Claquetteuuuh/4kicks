"use client"
import React, { useEffect, useState } from 'react';
import { userType } from '../../../types/global/UserType';
import axios from 'axios';
import { ProduitType } from '../../../types/home/Produit';
import { useSearchParams } from "next/dist/client/components/navigation";
import ProductRecherche from '@/components/ProductRecherche/ProductRecherche';
import Loading from '@/components/Loading/Loading';
import CheckAccountLayout from '@/components/checkAccountLayout/CheckAccountLayout';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import { FullProductType } from '../../../types/product/Product';


export default function Recherche({ params }: { params: { user: userType } }) {
    const [favoris, setFavoris] = useState<ProduitType[]>([]);
    const [recom, setRecom] = useState<ProduitType[]>([]);

    useEffect(() => {
        if(favoris.length === 0) {
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
        if(recom.length > 0) {
            axios
                .get(`/api/recommandations-favoris?userID=${params.user.user_id}`)
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
        <ProductCategories allProducts={favoris} name="Favoris" />
        <ProductCategories allProducts={recom} name="Découverte" />
    </CheckAccountLayout>
  );
}
