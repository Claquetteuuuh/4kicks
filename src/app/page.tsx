"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./main_page.module.css";
import CheckAccountLayout from "@/components/checkAccountLayout/CheckAccountLayout";
import { userType } from "../../types/global/UserType";
import axios from "axios";
import { useSearchParams } from "next/dist/client/components/navigation";
import { ArticlesType } from "../../types/home/Article";
import { AfficheType } from "../../types/home/Affiche";
import test from "node:test";
import Slider from "../components/Slider/Slider"
import { Component } from "lucide-react";

export default function Home({ params }: { params: { user: userType } }) {
  const [dataSearch, setdataSearch] = useState<ArticlesType[]>([]);
  const [affiches, setAffiches] = useState<AfficheType[]>([]);

  const parametre = useSearchParams();

  useEffect(() => {
    if (affiches.length === 0) {
      axios
        .get(`/api/affiches`)
        .then((response) => {
          console.log(response);
          setAffiches(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [affiches]);


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
      <Layout params={params}>
        <div className={styles.container_header}>
          <div className={styles.article_container}>
            {dataSearch ? (
              dataSearch.map((item: ArticlesType) => {
                return (
                  <div key={item.productUID} className={styles.container}>
                    <div className={styles.container_name}>
                      <h1 className={styles.article_name}>
                        {item.nameProduct}
                      </h1>
                    </div>
                    <div className={styles.container_image}>
                      <img
                        src={item.imageLien[0]}
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
        </div>
      </Layout>
      <Slider/>
    </CheckAccountLayout>
  );
}
