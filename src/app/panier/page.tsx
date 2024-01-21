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
<<<<<<< Updated upstream
        <ProductCategories allProducts={favoris} name="Favoris" />
        <ProductCategories allProducts={recom} name="Découverte" />
=======
      <div className={styles.panier}>
        <h1>Panier</h1>
        <div className={styles.content}>
          <div>
            {panier?.map((product) => {
              return (
                <div className={styles.product_item} key={product.product_uid}>
                  <div className={styles.img_container}>
                    <img
                      src={product.image_url}
                      alt={`picture of ${product.product_name}`}
                    />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.name}>{product.product_name}</p>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.color}>
                      <span>Couleur: </span>
                      {product.color}
                    </p>
                    <p className={styles.taille}>
                      <span>Taille / Pointure: </span>
                      {product.size}
                    </p>
                    <div className={styles.icons}>
                      <img src="/icons/save-outline.svg" alt="favorite icon" />
                      <img src="/icons/trash-outline.svg" alt="trash icon" />
                    </div>
                  </div>
                  <div className={styles.price}>
                    <p>{product.price.toFixed(2)}€</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.command}>
            <div className={styles.promo}>
              <p>J&apos;ai un code promo</p>
              <div className={styles.add}>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className={styles.detail}>
              <div>
                <p>Sous-total</p>
                <p>{calculTotal().toFixed(2)}€</p>
              </div>
              <div>
                <p>Total des frais estimés</p>
                <p>{(calculTotal()*0.10).toFixed(2)}€</p>
              </div>
            </div>
            <div className={styles.total}>
              <p>Total</p>
              <p>{(calculTotal()*1.10).toFixed(2)}€</p>
            </div>
            <PlainButton text="Paiement" />
          </div>
        </div>
      </div>
      <ProductCategories allProducts={favoris} name="Favoris" />
      <ProductCategories allProducts={recom} name="Découverte" />
>>>>>>> Stashed changes
    </CheckAccountLayout>
  );
}
