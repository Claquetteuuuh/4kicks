import styles from "./ButtonMarketplace.module.css"

export function ButtonPanier() {
  return <button className={styles.panier}>
          <div className={styles.svg}>
            <img src="/icons/panier_button.svg" alt="panier" />
          </div>
          </button>
}
