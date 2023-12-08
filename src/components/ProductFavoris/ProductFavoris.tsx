import React, { useState } from "react";
import styles from "./ProductFavoris.module.css";
import { ProduitType } from "../../../types/home/Produit";
import Link from "next/link";
import classNames from 'classnames';
import FavButton from "../FavButton/FavButton";

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

    const handleClick = (index: number) => {
        const updatedStates = [...buttonStates];
        updatedStates[index] = !updatedStates[index];
        setButtonStates(updatedStates);
    };

    return (
        <>
            <FavButton />
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
                            <div className={styles.product_item}>
                                <div className={styles.img_container}>
                                    <Link href={`/product/${product.productUID as string}`} key={product.productUID}>
                                        <img src={product.imageLien[0]} alt={`image of ${product.nameProduct}`} />
                                    </Link>
                                    <div className={styles.container_favIcons}>
                                        <button onClick={() => handleClick(index)}>
                                            <img src="/icons/fav_bubble.svg" alt="icone favoris" className={buttonClass}/>
                                            <img src="/icons/fav_bubble_vide.svg" alt="icon favoris vide" className={buttonClass2} />
                                        </button>
                                    </div>
                                </div>
                                <Link href={`/product/${product.productUID as string}`} key={product.productUID}>
                                    <div className={styles.info}>
                                        <div className={styles.info_top}>
                                            <p>{product.nameProduct}</p>
                                            <p className={styles.price}>{product.price} €</p>
                                        </div>
                                        <p className={styles.description}>{product.description}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div></>
    );
};

export default ProductFavoris;
