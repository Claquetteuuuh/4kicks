"use client";
import React, { useEffect, useState } from "react";
import { userType } from "../../../types/global/UserType";
import axios, { AxiosError } from "axios";
import { ProduitType } from "../../../types/home/Produit";
import { useSearchParams } from "next/dist/client/components/navigation";
import ProductRecherche from "@/components/ProductRecherche/ProductRecherche";
import Loading from "@/components/Loading/Loading";
import CheckAccountLayout from "@/components/checkAccountLayout/CheckAccountLayout";
import ProductCategories from "@/components/ProductCategories/ProductCategories";
import styles from "./panier.module.css";
import { PanierProductType } from "../../../types/product/Product";
import PlainButton from "@/components/plainButton/plainButton";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

export default function Panier({ params }: { params: { user: userType } }) {
  const [favoris, setFavoris] = useState<ProduitType[]>([]);
  const [recom, setRecom] = useState<ProduitType[]>([]);
  const [panier, setPanier] = useState<PanierProductType[]>();
  const [total, setTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (favoris.length === 0) {
      axios
        .get(`/api/favoris?userID=${params.user.user_id}`)
        .then((response) => {
          console.log(response);
          setFavoris(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [favoris]);

  useEffect(() => {
    axios
      .get(`/api/recommandation/favoris?userID=${params.user?.user_id}`)
      .then((response) => {
        console.log(response)
        setRecom(response.data)
      })
      .catch((err) => {
        console.error(err)
      })

  })

  useEffect(() => {
    setTotal(calculTotal() * 1.12);
  }, [panier]);


  useEffect(() => {
    axios
      .get(`/api/user/${params.user.email}/panier`)
      .then((e) => {
        setPanier(e.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  }, []);

  const createPayPalOrder = async (): Promise<string> => {
    const response = await axios.post("/api/paypal/create_order", {
      account_uid: params.user.user_id,
    });
    return response.data.orderID;
  };

  const onApprove = async (data: any, actions: any): Promise<void> => {
    console.log(data);
    actions.order.capture().then(async (details: any) => {
      console.log(details);
      console.log(details.purchase_units[0].shipping.address);
      const {
        address_line_1,
        address_line_2,
        admin_area_2,
        country_code,
        postal_code,
      } = details.purchase_units[0].shipping.address;
      const { full_name } = details.purchase_units[0].shipping.name;
      await axios.post("/api/paypal/capture_order", {
        orderID: data.orderID,
        name: full_name,
        postal_code: postal_code,
        address: address_line_1,
        cmp_address: address_line_2,
        city: admin_area_2,
        country: country_code,
      })
        .then(e => {
          console.log(e.data)
          router.refresh();
        })
    });
  };
  const calculTotal = () => {
    let total = 0;
    panier?.forEach((prod) => {
      total += prod.price;
    });
    return total;
  };

  const suppression = (product_uid: string) => {

    axios
      .delete(`/api/user/${params.user.email}/panier/${product_uid}`)
      .then((response) => {
        console.log(response)
        window.location.reload();
      })
      .catch((err) => {
        console.error(err)
      })

  }
  return (
    <CheckAccountLayout user={params.user}>
      <div className={styles.panier}>
        <h1>Panier</h1>
        {
          (panier?.length != 0) ?
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
                          <img
                            src="/icons/trash-outline.svg"
                            alt="trash icon"
                            onClick={() => suppression(product.product_uid)}
                            style={{ cursor: 'pointer' }}
                          />
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
                    <p>{(calculTotal() * 0.1).toFixed(2)}€</p>
                  </div>
                </div>
                <div className={styles.total}>
                  <p>Total</p>
                  <p>{(calculTotal() * 1.10).toFixed(2)}€</p>
                </div>
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
                    currency: "EUR",
                    intent: "capture",
                  }}
                >
                  <PayPalButtons
                    style={{
                      color: "blue",
                      shape: "rect",
                      label: "pay",
                      height: 50,
                    }}
                    createOrder={createPayPalOrder}
                    onApprove={onApprove}
                  />
                </PayPalScriptProvider>
                {/* <PlainButton text="Loading ..." /> */}
              </div>
            </div> :
            <div className={styles.panier_vide}>
              <p className={styles.vide}>Votre panier est vide</p>
              <PlainButton text="Je veux dépenser" onClick={() => window.location.href = "/"} />
            </div>
        }
        <ProductCategories allProducts={favoris} name="Favoris" />
      <ProductCategories allProducts={recom} name="Recommandation" />
      </div>
    </CheckAccountLayout>
  );
}
