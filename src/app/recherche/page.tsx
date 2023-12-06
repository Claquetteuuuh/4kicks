"use client"
import CheckAccountLayout from '@/components/checkAccountLayout/CheckAccountLayout';
import React, { useEffect, useState } from 'react';
import { userType } from '../../../types/global/UserType';
import axios from 'axios';
import { ProduitType } from '../../../types/home/Produit';
import { useSearchParams } from "next/dist/client/components/navigation";
import ProductRecherche from '@/components/ProductRecherche/ProductRecherche';
// import styles from "./SelectLang.module.css"

export default function Recherche ({ params }: { params: { user: userType } }) {
    const parametre = useSearchParams();
    const [dataSearch, setdataSearch] = useState<ProduitType[]>([]);
    
    useEffect(() => {
        if (parametre?.get("mot")) {
          axios
            .get(`/api/recherches?mot=${parametre?.get("mot")}`)
            .then((e) => {
              console.log(e);
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

    return (
        <CheckAccountLayout user={params.user}>
            <ProductRecherche allProducts={dataSearch} name={parametre?.get("mot")}/>
        </CheckAccountLayout>
    );
}