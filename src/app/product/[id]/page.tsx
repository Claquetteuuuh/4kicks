"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { FullProductType } from "../../../../types/product/Product";
import styles from "./product_uid.module.css";
import SelectInput from "@/components/selectInput/SelectInput";
import Navbar from "@/components/Navbar/Navbar";
import { userType } from "../../../../types/global/UserType";
import CheckAccountLayout from "@/components/checkAccountLayout/CheckAccountLayout";
import PlainButton from "@/components/plainButton/plainButton";
import ProductCategories from "@/components/ProductCategories/ProductCategories";
import { ProduitType } from "../../../../types/home/Produit";
import Footer from "@/components/footer/Footer";
import Loading from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, useToast } from "@/components/ui/use-toast"

type paramType = {
  id?: string;
};


const Page = ({ params }: { params: { user: userType } }) => {
  const session = useSession();
  const router = useRouter();
  const categorie = "Femme"
  const stars = [1, 2, 3, 4, 5];
  const param: paramType | null = useParams();
  const [produit, setProduit] = useState<FullProductType>();

  const [displayedImage, setDisplayedImage] = useState<string>();

  const [selectedSize, setSelectedSize] = useState(produit?.sizes[0]);

  const [sameThemeProducts, setSameThemeProducts] = useState<ProduitType[]>([]);
  const [favoris, setFavoris] = useState<Boolean>();

  useEffect(() => {
    if (!session.data?.user) {

    } else {
      if (favoris == undefined) {
        axios
          .get('/api/favoris?userEmail=' + session.data.user.email + '&productUID=' + param?.id)
          .then((e) => {
            setFavoris(e.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }

    }

  })

  useEffect(() => {
    setDisplayedImage(produit?.images_url[0]);
    setSelectedSize(produit?.sizes[0]);
  }, [produit]);
  useEffect(() => {
    if (param?.id) {
      const url = `/api/produits?uid=${param?.id}`;
      axios
        .get(url)
        .then((e) => {
          setProduit(e.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [param?.id]);

  // categorie
  useEffect(() => {
    axios.get(`/api/recommandation/product?productID=${produit?.product_uid}`)
      .then(e => {
        setSameThemeProducts(e.data);
      })
      .catch(err => {
        console.error(err);
      })
  })

  const createToast = (type: "error" | "info", description: string) => {
    toast({
      className: styles.toast,
      title: type,
      description: description,
    })
  };

  const addPanier = () => {
    if (!session.data?.user) {
      router.push("/login")
    } else {
      axios.post(`/api/user/${session.data.user.email}/panier`, {
        id: param?.id,
        taille: selectedSize
      })
        .then(e => {
          createToast("info", "Le produit à été ajouté au panier avec succès !")
          window.location.href = "/panier";
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  const addFavorite = async () => {

    if (!session.data?.user) {
      router.push("/login")
    } else {

      let verif: boolean = false;
      await axios.get('/api/favoris?userEmail=' + session.data.user.email + '&productUID=' + param?.id)
        .then(e => {
          console.log(e.data)
          verif = e.data
        })
        .catch(err => {
          console.error(err)
        })
      console.log("1 " + verif)
      if (!verif) {
        console.log("2 " + verif)
        axios.post(`/api/favoris`, {
          product_uid: param?.id,
          account_email: session.data.user.email
        })
          .then(e => {
            console.log(e)
          })
          .catch(err => {
            console.error(err)
          })
      }
      else {
        axios.delete('/api/favoris?userEmail=' + session.data.user.email + '&productUID=' + param?.id)
          .then(e => {
            console.log(e)
          })
          .catch(err => {
            console.error(err)
          })
      }
    }

  }

  const handleClick = () => {
    if (favoris == false) {
      setFavoris(true)
    }
    else {
      setFavoris(false)
    }
  };



  return (
    <CheckAccountLayout user={params.user}>
      <div className={styles.product_uid}>
        {produit ? (

          <>
            <div className={styles.product_info}>
              <div className={styles.product_images}>
                <div className={styles.image_clickable}>
                  {produit.images_url.map((url) => {
                    return (
                      <div
                        className={url == displayedImage ? styles.selected : ""}
                        key={url}
                      >
                        <img
                          onClick={(e) => setDisplayedImage(url)}
                          src={url}
                          alt={`image of ${produit.product_name}`}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className={styles.displayed_image}>
                  <img
                    src={displayedImage}
                    alt={`image of product ${produit.product_name}`}
                  />
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.top}>
                  <div>
                    <h2>{produit.product_name}</h2>
                    <p>{produit.description}</p>
                  </div>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => { addFavorite(); handleClick(); }}
                    className={`${(favoris)?styles.clickSVG: styles.noClickSVG}`}
                  >
                    <path
                      d="M34.375 4.6875H15.625C14.3818 4.6875 13.1895 5.18136 12.3104 6.06044C11.4314 6.93951 10.9375 8.1318 10.9375 9.375V45.3125L25 32.8125L39.0625 45.3125V9.375C39.0625 8.1318 38.5686 6.93951 37.6896 6.06044C36.8105 5.18136 35.6182 4.6875 34.375 4.6875Z"
                      stroke="black"
                      strokeOpacity="0.6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className={styles.price}>{produit.price} €</p>
                <div className={styles.more_info}>
                  <p>
                    <span>Marque:</span> {produit.marque}
                  </p>
                  <p>
                    <span>Couleur:</span> {produit.colors[0]}
                  </p>
                </div>
                <div className={styles.taille}>
                  <p>Taille</p>
                  <SelectInput
                    elements={produit.sizes}
                    setState={setSelectedSize}
                    state={selectedSize as string}
                    placeholder="Taille"
                  />
                </div>
                <div className={styles.add_panier}>
                  <PlainButton
                    onClick={addPanier}
                    className={styles.add_btn}
                    text="Ajouter au panier"
                  />
                </div>
                <p className={styles.long_desc}>
                  {produit.complete_description}
                </p>
                <div className={styles.avis}>
                  <p>
                    <span>Avis</span> ({produit.avis.length})
                  </p>
                  <div className={styles.stars_container}>
                    {stars.map((star) => {
                      return (
                        <div key={star}>
                          <svg
                            className={
                              star <= produit.avis_avg ? styles.filled : ""
                            }
                            width="31"
                            height="29"
                            viewBox="0 0 31 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.0245 1.08156C15.1741 0.620904 15.8259 0.6209 15.9755 1.08156L18.729 9.55573C18.9298 10.1738 19.5057 10.5922 20.1555 10.5922L29.0658 10.5922C29.5502 10.5922 29.7516 11.212 29.3597 11.4967L22.1511 16.734C21.6254 17.116 21.4054 17.7931 21.6062 18.4111L24.3597 26.8853C24.5093 27.3459 23.9821 27.729 23.5902 27.4443L16.3817 22.2069C15.8559 21.825 15.1441 21.825 14.6183 22.2069L7.40976 27.4443C7.01791 27.729 6.49067 27.3459 6.64034 26.8853L9.39377 18.4111C9.59458 17.7931 9.37459 17.116 8.84886 16.734L1.6403 11.4967C1.24844 11.212 1.44983 10.5922 1.93419 10.5922L10.8445 10.5922C11.4943 10.5922 12.0702 10.1738 12.271 9.55573L15.0245 1.08156Z"
                              stroke="black"
                            />
                          </svg>
                        </div>
                      );
                    })}
                    <img
                      className={styles.more}
                      src="/icons/plus.svg"
                      alt="add"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.other_products}>
              {sameThemeProducts ? (
                <ProductCategories
                  allProducts={sameThemeProducts}
                  name="Recommandations"
                />
              ) : (
                <Loading />
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </CheckAccountLayout>
  );
};

export default Page;
