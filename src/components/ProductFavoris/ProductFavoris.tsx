import React from "react";
import styles from "./ProductFavoris.module.css";
import { ProduitType } from "../../../types/home/Produit";
import Link from "next/link";

const ProductFavoris = ({
  allProducts,
  name,
}: {
  allProducts: ProduitType[];
  name: string | null | undefined;
}) => {

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h3>{name}</h3>
      </div>
      <div className={styles.products_container}>
        {
            allProducts.map(product => {
                return(
                    <Link href={`/product/${product.productUID as string}`} key={product.productUID} className={styles.product_item}>
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
                    </Link>
                )
            })
        }
      </div>
    </div>
  );
};

export default ProductFavoris;
