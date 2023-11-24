import { PersonIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button"
import styles from "./ButtonMarketplace.module.css"

type ButtonMarketplaceProps = {
  className?: string
}


export function ButtonMarketplace({className}: ButtonMarketplaceProps) {
  return <div className={`${styles.container} ${className}`}>
      <Button className={styles.bouton_connecter}>
        <div className={styles.svg}>
          <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 11.9801C6.90683 12.3699 7.39918 12.2973 9.50327 9.42953C9.95543 8.81327 10.9127 8.89359 11.3399 9.52744C13.2878 12.4178 16.2922 13.617 19.1142 9.86772C19.561 9.27407 20.4872 9.24097 20.9781 9.79876C22.5714 11.6092 24.132 12.0347 25.5 11.7482M4.5 11.9801C3.00882 11.7387 1.66715 10.692 1.07698 8.37223C1.02292 8.15974 1.05077 7.93481 1.14489 7.73678C2.44909 4.99287 3.60393 2.71577 4.22108 1.53057C4.39176 1.2028 4.7309 1 5.10044 1H24.8627C25.2515 1 25.605 1.22529 25.7692 1.57766L28.7759 8.03072C28.916 8.33153 28.8994 8.68307 28.7254 8.96564C27.9944 10.1527 27.0701 11.4194 25.5 11.7482M4.5 11.9801V23.0047C4.5 23.557 4.94772 24.0047 5.5 24.0047H10M25.5 11.7482V23.0047C25.5 23.557 25.0523 24.0047 24.5 24.0047H20M20 24.0047V16.9624C20 16.0235 19.9 15.0845 17.5 15.0845C16.6656 15.0845 15.8071 15.0845 15 15.0845M20 24.0047H15M10 24.0047C10 21.9703 10 17.6197 10 16.493C10 15.3662 11 15.0845 11.5 15.0845C12.1523 15.0845 13.4856 15.0845 15 15.0845M10 24.0047H15M15 15.0845V24.0047" stroke="black" strokeWidth="2" />
          </svg>
        </div>

        Marketplace
      </Button>
  </div>
}
