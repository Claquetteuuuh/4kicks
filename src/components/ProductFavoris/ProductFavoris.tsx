import React, { useState } from "react";
import styles from "./ProductFavoris.module.css";
import { ProduitType } from "../../../types/home/Produit";
import Link from "next/link";
import classNames from 'classnames';
import axios from "axios";
import { useSession } from "next-auth/react";
import router from "next/router";

const ProductFavoris = ({
    allProducts,
    name,
    setChange,
}: {
    allProducts: ProduitType[];
    name: string | null | undefined;
    setChange?: ProduitType[];
}) => {
    const [buttonStates, setButtonStates] = useState<boolean[]>(new Array(allProducts.length).fill(false));
    const session = useSession();
    const handleClick = (index: number) => {
        const updatedStates = [...buttonStates];
        updatedStates[index] = !updatedStates[index];
        setButtonStates(updatedStates);
        if (!session.data?.user) {
            router.push("/login")
        } else {
            axios.delete('/api/favoris?userEmail=' + session.data.user.email + '&productUID=' + allProducts[index].productUID)
                .then(e => {
                    console.log(e)
                    window.location.reload();
                })
                .catch(err => {
                    console.error(err)
                })
        }
    };


    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h3>{name}</h3>
                </div>
                <div className={styles.products_container}>
                    {allProducts.map((product, index) => {
                        const buttonClass = classNames(styles.favicon, {
                            [styles.buttonClicked]: buttonStates[index],
                        });

                        const buttonClass2 = classNames(styles.favicon, {
                            [styles.buttonClicked]: !buttonStates[index],
                        });

                        return (
                            <div className={styles.product_item} key={product.productUID}>
                                <div className={styles.img_container}>
                                    <a href={`/product/${product.productUID as string}`}>
                                        <img src={product.imageLien[0]} alt={`image of ${product.nameProduct}`} />
                                    </a>
                                    <div className={styles.container_favIcons}>
                                        <button onClick={() => handleClick(index)}>
                                            <img src="/icons/fav_bubble.svg" alt="icone favoris" className={buttonClass} />
                                            <img src="/icons/fav_bubble_vide.svg" alt="icon favoris vide" className={buttonClass2} />
                                        </button>
                                    </div>
                                </div>
                                <a href={`/product/${product.productUID as string}`}>
                                    <div className={styles.info}>
                                        <div className={styles.info_top}>
                                            <p>{product.nameProduct}</p>
                                            <p className={styles.price}>{product.price} €</p>
                                        </div>
                                        <p className={styles.description}>{product.description}</p>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div></>
    );
};

export default ProductFavoris;
