import React from "react";
import styles from "./ProductRecherche.module.css";
import { ProduitType } from "../../../types/home/Produit";
import Link from "next/link";

export default function PanierListe() {
    return (
        <div className={styles.container}>
            <div className={styles.container_img}>
                <img src="/imgs/background-logos.png" alt="logo" />
            </div>
            <div className={styles.container_info}>
                <h2>Mehdi 12</h2>
                <p></p>
            </div>
        </div>
    )
}
