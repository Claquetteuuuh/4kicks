import { PersonIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button"
import styles from "./ButtonSeConnecter.module.css"

type ButtonSeConnecterProps = {
  className?: string
}

export function ButtonSeConnecter({className}: ButtonSeConnecterProps) {

  return <div className={`${styles.container} ${className}`}>
   <Button className={styles.bouton_connecter}>
          <div className={styles.svg}>
          <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.7904 2.6162C16.5741 1.38322 14.8754 0.704231 13.0004 0.704231C11.1154 0.704231 9.41098 1.37911 8.20036 2.60447C6.97661 3.84332 6.38036 5.527 6.52036 7.34508C6.79786 10.9319 9.70473 13.8498 13.0004 13.8498C16.296 13.8498 19.1979 10.9325 19.4797 7.34625C19.6216 5.54461 19.0216 3.86444 17.7904 2.6162ZM24.0004 26.9953H2.00036C1.7124 26.9988 1.42722 26.942 1.16559 26.829C0.903946 26.716 0.672422 26.5497 0.487858 26.3421C0.0816075 25.8862 -0.0821426 25.2635 0.0391075 24.6338C0.566607 21.8862 2.21286 19.5781 4.80036 17.9578C7.09911 16.5194 10.011 15.7277 13.0004 15.7277C15.9897 15.7277 18.9016 16.52 21.2004 17.9578C23.7879 19.5775 25.4341 21.8856 25.9616 24.6332C26.0829 25.2629 25.9191 25.8856 25.5129 26.3416C25.3284 26.5492 25.0969 26.7157 24.8352 26.8288C24.5736 26.9419 24.2884 26.9988 24.0004 26.9953Z" fill="#33A9FF"/>
          </svg>
          </div>
          
          Se connecter
        </Button>
        </div>
}
