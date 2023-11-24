"use client";
import SearchBar from "@/components/TextInput/TextInput";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AfficheType } from "../../types/home/Affiche";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import { useSearchParams } from "next/navigation";
import { ArticlesType } from "../../types/home/Article";
import styles from "./main_page.module.css";
import { ButtonSeConnecter } from "@/components/Button/ButtonSeConnecter/ButtonSeConnecter";
import { ButtonMarketplace } from "@/components/Button/ButtonMarketplace/ButtonMarketplace";
import CheckAccountLayout from "@/components/checkAccountLayout/CheckAccountLayout";
import { userType } from "../../types/global/UserType";

export default function Home({ params }: { params: { user: userType } }) {
  const [dataSearch, setdataSearch] = useState<ArticlesType[]>([]);
  const [affiches, setAffiches] = useState<AfficheType>();

  const parametre = useSearchParams();

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

  return (
    <CheckAccountLayout user={params.user}>
      <Layout>
        <div className={styles.container_header}>
          <Header />
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
      </Layout>
    </CheckAccountLayout>
  );
}
