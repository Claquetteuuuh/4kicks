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
import { toast } from "@/components/ui/use-toast";
import TextInput from "@/components/TextInput/TextInput";

export default function Panier({ params }: { params: { user: userType } }) {
  const [favoris, setFavoris] = useState<ProduitType[]>([]);
  const [recom, setRecom] = useState<ProduitType[]>([]);
  const [panier, setPanier] = useState<PanierProductType[]>();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [displayCode, setDisplayCode] = useState(false);

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
        console.log(response);
        setRecom(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  useEffect(() => {
    setTotal(calculTotal() * 1.12);
  }, [panier]);

  useEffect(() => {
    if (params.user) {
      axios
        .get(`/api/user/${params.user.email}/panier`)
        .then((e) => {
          setPanier(e.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [params]);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  }, []);

  const createPayPalOrder = async (): Promise<string> => {
    const response = await axios.post("/api/paypal/create_order", {
      account_uid: params.user.user_id,
      promo: code,
    });
    return response.data.orderID;
  };

  const createToast = (
    type: "error" | "info" | "good",
    description: string
  ) => {
    let style = styles.toast_info;
    if (type === "error") {
      style = styles.error;
    } else if (type === "good") {
      style = styles.good;
    }
    toast({
      className: `${styles.toast} ${style}`,
      title: type,
      description: description,
    });
  };

  const onApprove = async (data: any, actions: any): Promise<void> => {
    // console.log(data);
    createToast(
      "info",
      "Votre payement a été approuvé ! En attente de validation..."
    );
    setLoading(true);
    actions.order.capture().then(async (details: any) => {
      const {
        address_line_1,
        address_line_2,
        admin_area_2,
        country_code,
        postal_code,
      } = details.purchase_units[0].shipping.address;
      const { full_name } = details.purchase_units[0].shipping.name;
      await axios
        .post("/api/paypal/capture_order", {
          orderID: data.orderID,
          name: full_name,
          postal_code: postal_code,
          address: address_line_1,
          cmp_address: address_line_2,
          city: admin_area_2,
          country: country_code,
        })
        .then((e) => {
          createToast("good", "Votre achat a été effectué avec succès !");
          setLoading(false);
          // console.log(e.data);
          router.refresh();
          window.location.href = "/";
        })
        .catch((err) => {
          createToast("error", "Une erreur est survenue lors de l'achat !");
        });
      setLoading(false);
    });
  };
  const calculTotal = () => {
    let total = 0;
    panier?.forEach((prod) => {
      total += prod.price;
    });
    return total;
  };

  const triggerCode = () => {
    if (displayCode) {
      setDisplayCode(false);
      return;
    }
    setDisplayCode(true);
  };
  const validCode = () => {
    if (!code) {
      createToast("error", "Vous n'avez pas entré de code !");
      return;
    }
    axios
      .post("/api/promo", {
        promo: code,
      })
      .then((e) => {
        setTotal(total * e.data.data.coefficient);
        createToast("good", "Your code has been applied");
      })
      .catch((err) => {
        createToast("error", "This code doesn't exists");
      });
  };

  const suppression = (product_uid: string) => {
    axios
      .delete(`/api/user/${params.user.email}/panier/${product_uid}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <CheckAccountLayout user={params.user}>
      <div className={styles.panier}>
        {loading ? (
          <div className={styles.loading_payement}>
            <p>Achat en cours...</p>
            <Loading />
          </div>
        ) : (
          false
        )}
        <h1>Panier</h1>
        {panier?.length != 0 ? (
          <div className={styles.content}>
            <div>
              {panier?.map((product) => {
                return (
                  <div
                    className={styles.product_item}
                    key={product.product_uid}
                  >
                    <div className={styles.img_container}>
                      <img
                        src={product.image_url}
                        alt={`picture of ${product.product_name}`}
                      />
                    </div>
                    <div className={styles.info}>
                      <a
                        href={`/product/${product.product_uid}`}
                        className={styles.name}
                      >
                        {product.product_name}
                      </a>
                      <p className={styles.description}>
                        {product.description}
                      </p>
                      <p className={styles.color}>
                        <span>Couleur: </span>
                        {product.color}
                      </p>
                      <p className={styles.taille}>
                        <span>Taille: </span>
                        {product.size}
                      </p>
                      <div className={styles.icons}>
                        <img
                          src="/icons/save-outline.svg"
                          alt="favorite icon"
                        />
                        <img
                          src="/icons/trash-outline.svg"
                          alt="trash icon"
                          onClick={(e) => suppression(product.product_uid)}
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
                <div onClick={triggerCode} className={styles.add}>
                  <div></div>
                  {!displayCode ? <div></div> : false}
                </div>
              </div>
              {displayCode ? (
                <div className={styles.promo_input_container}>
                  <TextInput
                    className={styles.input}
                    placeholder="CODE"
                    state={code}
                    setState={setCode}
                  />
                  <PlainButton onClick={validCode} text="Valider" />
                </div>
              ) : (
                false
              )}
              <div className={styles.detail}>
                <div>
                  <p>Sous-total</p>
                  <p>{total.toFixed(2)}€</p>
                </div>
                <div>
                  <p>Total des frais estimés</p>
                  <p>{(total*0.1).toFixed(2)}€</p>
                </div>
              </div>
              <div className={styles.total}>
                <p>Total</p>
                <p>{(total+(total*.1)).toFixed(2)}€</p>
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
          </div>
        ) : (
          <div className={styles.panier_vide}>
            <p className={styles.vide}>Votre panier est vide</p>
            <PlainButton
              text="Je veux dépenser"
              onClick={() => (window.location.href = "/")}
            />
          </div>
        )}
      </div>
      <div className={styles.more}>
        <ProductCategories allProducts={favoris} name="Favoris" />
        <ProductCategories allProducts={recom} name="Découverte" />
      </div>
    </CheckAccountLayout>
  );
}
