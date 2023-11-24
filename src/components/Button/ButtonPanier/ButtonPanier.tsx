import styles from "./ButtonPanier.module.css"

type ButtonPanierProps = {
  className?: string
}

export function ButtonPanier({className}: ButtonPanierProps) {
  return <div className={`${styles.container} ${className}`}>
          <button className={styles.panier}>
          <div className={styles.svg}>
            <img src="/icons/panier_button.svg" alt="panier" />
          </div>
          </button>
          </div>
}
