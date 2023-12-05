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
                            <td className={styles.td}><Link href={"/presentation"}>A propos de 4Kicks</Link></td>
                            <td className={styles.td}><Link href={"/apagnan"}>apagnan quoicoukwak</Link></td>
                            <td className={styles.td}><Link href={"/contact"}>Nous contacter</Link></td>
                            <td className={styles.td}><Link href={"/marketplace"}>Marketplace</Link></td>
                        </tr>
                        <tr>
                            <td className={styles.td}><Link href={"/histoire"}>Notre histoire </Link></td>
                            <td className={styles.td}><Link href={"/apagnan"}>apagnan quoicoukwak</Link></td>
                            <td className={styles.td}><Link href={"/achat"}>Achat</Link></td>
                            <td className={styles.td}><Link href={"/forum"}>Forum</Link></td>
                        </tr>
                        <tr>
                            <td className={styles.td}><Link href={"/apagnan"}>apagnan quoicoukwak</Link></td>
                            <td className={styles.td}></td>
                            <td className={styles.td}><Link href={"/securite"}>Sécurité</Link></td>
                            <td className={styles.td}></td>
                        </tr>
                        <tr>
                            <td className={styles.td}><Link href={"/apagnan"}>apagnan quoicoukwak</Link></td>
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
                <Link href={"https://www.instagram.com/kicks4lyon/"}>
                    <img src="/icons/logo-instagram 1.svg" alt="logo instagram" className={styles.img} />
                </Link>
                <Link href={"https://twitter.com/?lang=fr"}>
                    <img src="/icons/logo-twitter 1.svg" alt="logo twitter" className={styles.img} />
                </Link>
                <Link href={"https://discord.com/"}>
                    <img src="/icons/logo-discord 1.svg" alt="logo discord" className={styles.img} />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
