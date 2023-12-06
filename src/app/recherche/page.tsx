"use client"
import React, { useEffect, useState } from 'react';
import { userType } from '../../../types/global/UserType';
import axios from 'axios';
import { ProduitType } from '../../../types/home/Produit';
import { useSearchParams } from "next/dist/client/components/navigation";
import ProductRecherche from '@/components/ProductRecherche/ProductRecherche';
import Loading from '@/components/Loading/Loading';
import CheckAccountLayout from '@/components/checkAccountLayout/CheckAccountLayout';

export default function Recherche({ params }: { params: { user: userType } }) {
  const parametre = useSearchParams();
  const [dataSearch, setdataSearch] = useState<ProduitType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (parametre?.get("mot")) {
          response = await axios.get(`/api/recherches?mot=${parametre?.get("mot")}`);
        } else {
          response = await axios.get(`/api/recherches`);
        }
        setdataSearch(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parametre?.get("mot")]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <CheckAccountLayout user={params.user}>
          <ProductRecherche allProducts={dataSearch} name={parametre?.get("mot")} />
        </CheckAccountLayout>
      )}
    </>
  );
}
