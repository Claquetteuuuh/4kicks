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


export default function Recherche({ params }: { params: { user: userType } }) {
    const [favoris, setFavoris] = useState<ProduitType[]>([]);

    useEffect(() => {
        if(favoris.length === 0) {
            axios
                .get(`/api/favoris?userID=${params.user.email}`)
        }
    })


  return (
    <CheckAccountLayout user={params.user}>
        <ProductCategories allProducts={} />
    </CheckAccountLayout>
  );
}
