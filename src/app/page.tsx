"use client";
import React, { useState, useEffect } from "react";
import styles from "./main_page.module.css";
import CheckAccountLayout from "@/components/checkAccountLayout/CheckAccountLayout";
import { userType } from "../../types/global/UserType";
import axios from "axios";
import { useSearchParams } from "next/dist/client/components/navigation";
import { AfficheType } from "../../types/home/Affiche";
import { ProduitType } from "../../types/home/Produit";
import Slider from "../components/Slider/Slider";
import ProductCategories from "@/components/ProductCategories/ProductCategories";

export default function Home({ params }: { params: { user: userType } }) {
  const [affiches, setAffiches] = useState<AfficheType[]>([]);
  const [categorieN, setCategorieN] = useState<ProduitType[]>([]);
  const [categorieF, setCategorieF] = useState<ProduitType[]>([]);
  const [categorieH, setCategorieH] = useState<ProduitType[]>([]);

  

  useEffect(() => {
    if (affiches.length === 0) {
      axios
        .get(`/api/affiches`)
        .then((response) => {
          // console.log(response);
          setAffiches(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [affiches]);

  useEffect(() => {
    if (categorieN.length === 0) {
      axios
        .get(`/api/categories?category=nouveautés`)
        .then((response) => {
          console.log(response);
          setCategorieN(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [categorieN]);

  useEffect(() => {
    if (categorieH.length === 0) {
      axios
        .get(`/api/categories?category=homme`)
        .then((response) => {
          console.log(response);
          setCategorieH(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [categorieH]);

  useEffect(() => {
    if (categorieF.length === 0) {
      axios
        .get(`/api/categories?category=femme`)
        .then((response) => {
          console.log(response);
          setCategorieF(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [categorieF]);

  return (
    <CheckAccountLayout user={params.user}>
      <Slider />
      <div className={styles.container_authenticity}>
        <img
          src="/icons/shield-checkmark.svg"
          alt="shield checkmark"
          className={styles.img_shield}
        />
        <div className={styles.container_p_authenticity}>
          <p className={styles.p_title}>AUTHENTICITE</p>
          <p className={styles.p_subtitle}>Vérifie par nos équipe</p>
        </div>
        <img
          src="/icons/airplane1.svg"
          alt="airplane pictures"
          className={styles.img_airplane}
        />
        <div className={styles.container_p_authenticity}>
          <p className={styles.p_title}>RETOUR GRATUIT</p>
          <p className={styles.p_subtitle}>Sous 30 jours</p>
        </div>
        <img
          src="/icons/card1.svg"
          alt="portefeuille"
          className={styles.img_portefeuille}
        />
        <div className={styles.container_p_authenticity}>
          <p className={styles.p_title}>PRIX ABORDABLE</p>
          <p className={styles.p_subtitle}>20% moins chère</p>
        </div>
      </div>
      <div className={styles.categorie}>
        <ProductCategories allProducts={categorieN} name="Nouveautés" />
        <ProductCategories allProducts={categorieH} name="Homme" />
        <ProductCategories allProducts={categorieF} name="Femme" />
      </div>
    </CheckAccountLayout>
  );
}
