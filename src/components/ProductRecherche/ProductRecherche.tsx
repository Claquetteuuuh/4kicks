import React from "react";
import styles from "./ProductRecherche.module.css";
import { ProduitType } from "../../../types/home/Produit";
import Link from "next/link";

const ProductRecherche = ({
  allProducts,
  name,
}: {
  allProducts: ProduitType[];
  name: string | null | undefined;
}) => {

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>&quot;{name}&quot;</h2>
      </div>
      <div className={styles.products_container}>
        {
            allProducts.map(product => {
                return(
                    <a href={`/product/${product.productUID as string}`} key={product.productUID} className={styles.product_item}>
                        <div className={styles.img_container}>
                            <img src={product.imageLien[0]} alt={`image of ${product.nameProduct}`} />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.info_top}>
                                <p>{product.nameProduct}</p>
                                <p className={styles.price}>{product.price} €</p>
                            </div>
                            <p className={styles.description}>{product.description}</p>
                        </div>
                    </a>
                )
            })
        }
      </div>
    </div>
  );
};

export default ProductRecherche;
