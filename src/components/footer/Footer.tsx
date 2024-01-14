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
                            <td className={styles.td}><a href={"/presentation"}>A propos de 4Kicks</a></td>
                            <td className={styles.td}><a href={"/apagnan"}>apagnan quoicoukwak</a></td>
                            <td className={styles.td}><a href={"/contact"}>Nous contacter</a></td>
                            <td className={styles.td}><a href={"/marketplace"}>Marketplace</a></td>
                        </tr>
                        <tr>
                            <td className={styles.td}><a href={"/histoire"}>Notre histoire </a></td>
                            <td className={styles.td}><a href={"/apagnan"}>apagnan quoicoukwak</a></td>
                            <td className={styles.td}><a href={"/achat"}>Achat</a></td>
                            <td className={styles.td}><a href={"/forum"}>Forum</a></td>
                        </tr>
                        <tr>
                            <td className={styles.td}><a href={"/apagnan"}>apagnan quoicoukwak</a></td>
                            <td className={styles.td}></td>
                            <td className={styles.td}><a href={"/securite"}>Sécurité</a></td>
                            <td className={styles.td}></td>
                        </tr>
                        <tr>
                            <td className={styles.td}><a href={"/apagnan"}>apagnan quoicoukwak</a></td>
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
                <a href={"https://www.instagram.com/kicks4lyon/"}>
                    <img src="/icons/logo-instagram 1.svg" alt="logo instagram" className={styles.img} />
                </a>
                <a href={"https://twitter.com/?lang=fr"}>
                    <img src="/icons/logo-twitter 1.svg" alt="logo twitter" className={styles.img} />
                </a>
                <a href={"https://discord.com/"}>
                    <img src="/icons/logo-discord 1.svg" alt="logo discord" className={styles.img} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
