import styles from "./ButtonMarketplace.module.css"

export function ButtonFavoris() {
  return <button className={styles.panier}>
          <div className={styles.svg}>
            <img src="/icons/favoris_icon.svg" alt="panier" className={styles.images}/>
          </div>
          </button>
}
