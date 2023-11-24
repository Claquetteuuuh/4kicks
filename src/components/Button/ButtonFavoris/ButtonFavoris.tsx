import styles from "./ButtonFavoris.module.css"

type ButtonFavorisProps = {
  className?: string
}

export function ButtonFavoris({className}: ButtonFavorisProps) {
  return <div className={`${styles.container} ${className}`}>
            <button className={styles.favoris}>
            <div className={styles.svg}>
              <img src="/icons/favoris_icon.svg" alt="panier" className={styles.images}/>
            </div>
            </button>
          </div>
}
