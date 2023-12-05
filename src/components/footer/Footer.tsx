import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <table className={styles.container_tableau}>
                    <thead>
                        <tr>
                            <td className={styles.th}>4Kicks</td>
                            <td className={styles.th}>Partenaire</td>
                            <td className={styles.th}>Aide</td>
                            <td className={styles.th}>Communauté</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles.td}>A propos de 4Kicks</td>
                            <td className={styles.td}>apagnan quoicoukwak</td>
                            <td className={styles.td}>Nous contacter</td>
                            <td className={styles.td}>Marketplace</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Notre histoire</td>
                            <td className={styles.td}>apagnan quoicoukwak</td>
                            <td className={styles.td}>Achat</td>
                            <td className={styles.td}>Forum</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>apagnan quoicoukwak</td>
                            <td className={styles.td}></td>
                            <td className={styles.td}>Sécurité</td>
                            <td className={styles.td}></td>
                        </tr>
                        <tr>
                            <td className={styles.td}>apagnan quoicoukwak</td>
                            <td className={styles.td}></td>
                            <td className={styles.td}></td>
                            <td className={styles.td}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.container_separator}>
                <div className={styles.separator}></div>
            </div>
            <div className={styles.container_image}>
                <Link href={""}>
                    <img src="/icons/logo-instagram 1.svg" alt="logo instagram" className={styles.img}/>
                </Link>
                <Link href={""}>
                    <img src="/icons/logo-twitter 1.svg" alt="logo twitter" className={styles.img} />
                </Link>
                <Link href={""}>
                    <img src="/icons/logo-discord 1.svg" alt="logo discord" className={styles.img}/>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
