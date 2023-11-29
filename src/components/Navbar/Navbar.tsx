import React, { useEffect, useState } from "react";
import TextInput from "../TextInput/TextInput";
import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";
import SelectLang from "../Select/SelectLang/SelectLang";
import { userType } from "../../../types/global/UserType";
import Link from "next/link";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Navbar({ user }: { user: userType }) {
  const router = useRouter();

  const [motCles, setmotCles] = useState<string>("");

  useEffect(() => {
  }, [user])

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/?mot=${motCles}`);
    router.refresh();
  };

  return (
    <header>
      <div className={styles.container}>
        <Link href="/">
          <img src="/imgs/logo.png" alt="logo" className={styles.logo} />
        </Link>
        <div className={styles.search}>
          <form onSubmit={handleForm}>
            <TextInput
              placeholder="Rechercher..."
              state={motCles}
              setState={setmotCles}
              className={styles.text_input}
            />
          </form>
        </div>

        <div className={styles.actions}>
          {user ? (
            <Link href={"/profile"} className={styles.profile_picture}>
              <img
                src={user.image ? user.image : "/imgs/default_user.png"}
                alt={`picture of ${user.username}`}
              />
              <p>{user.first_name}</p>
            </Link>
          ) : (
            <Link className={styles.button_connecter} href="/login">
              <svg
                width="26"
                height="27"
                viewBox="0 0 26 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7904 2.6162C16.5741 1.38322 14.8754 0.704231 13.0004 0.704231C11.1154 0.704231 9.41098 1.37911 8.20036 2.60447C6.97661 3.84332 6.38036 5.527 6.52036 7.34508C6.79786 10.9319 9.70473 13.8498 13.0004 13.8498C16.296 13.8498 19.1979 10.9325 19.4797 7.34625C19.6216 5.54461 19.0216 3.86444 17.7904 2.6162ZM24.0004 26.9953H2.00036C1.7124 26.9988 1.42722 26.942 1.16559 26.829C0.903946 26.716 0.672422 26.5497 0.487858 26.3421C0.0816075 25.8862 -0.0821426 25.2635 0.0391075 24.6338C0.566607 21.8862 2.21286 19.5781 4.80036 17.9578C7.09911 16.5194 10.011 15.7277 13.0004 15.7277C15.9897 15.7277 18.9016 16.52 21.2004 17.9578C23.7879 19.5775 25.4341 21.8856 25.9616 24.6332C26.0829 25.2629 25.9191 25.8856 25.5129 26.3416C25.3284 26.5492 25.0969 26.7157 24.8352 26.8288C24.5736 26.9419 24.2884 26.9988 24.0004 26.9953Z"
                  fill="#33A9FF"
                />
              </svg>
              Se connecter
            </Link>
          )}
          <Link className={styles.button_market} href={"/marketplace"}>
            <svg
              width="30"
              height="25"
              viewBox="0 0 30 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 11.9801C6.90683 12.3699 7.39918 12.2973 9.50327 9.42953C9.95543 8.81327 10.9127 8.89359 11.3399 9.52744C13.2878 12.4178 16.2922 13.617 19.1142 9.86772C19.561 9.27407 20.4872 9.24097 20.9781 9.79876C22.5714 11.6092 24.132 12.0347 25.5 11.7482M4.5 11.9801C3.00882 11.7387 1.66715 10.692 1.07698 8.37223C1.02292 8.15974 1.05077 7.93481 1.14489 7.73678C2.44909 4.99287 3.60393 2.71577 4.22108 1.53057C4.39176 1.2028 4.7309 1 5.10044 1H24.8627C25.2515 1 25.605 1.22529 25.7692 1.57766L28.7759 8.03072C28.916 8.33153 28.8994 8.68307 28.7254 8.96564C27.9944 10.1527 27.0701 11.4194 25.5 11.7482M4.5 11.9801V23.0047C4.5 23.557 4.94772 24.0047 5.5 24.0047H10M25.5 11.7482V23.0047C25.5 23.557 25.0523 24.0047 24.5 24.0047H20M20 24.0047V16.9624C20 16.0235 19.9 15.0845 17.5 15.0845C16.6656 15.0845 15.8071 15.0845 15 15.0845M20 24.0047H15M10 24.0047C10 21.9703 10 17.6197 10 16.493C10 15.3662 11 15.0845 11.5 15.0845C12.1523 15.0845 13.4856 15.0845 15 15.0845M10 24.0047H15M15 15.0845V24.0047"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
            Marketplace
          </Link>
          <Link href={"/panier"}>
            <img
              className={styles.images}
              src="/icons/panier_button.svg"
              alt="panier"
            />
          </Link>
          <Link href="/favoris">
            <img
              src="/icons/favoris_icon.svg"
              alt="panier"
              className={styles.images}
            />
          </Link>
          <SelectLang className={styles.selectLang} />
        </div>
      </div>
      <div className={styles.container_menu}>
      <div className={styles.container_button_nouveautes}>
        <button className={styles.button_nouveautes}>
          <p className={styles.paragraphe_button}>Nouveautés</p>
        </button>
      </div>
      <div>
        <NavigationMenu className={styles.navigation_menu}>
          <NavigationMenuList className={styles.navigation_list}>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={styles.navigation_item1}>Homme</NavigationMenuTrigger>
              <NavigationMenuContent className={styles.container_content}>
              <div className={styles.container_nouveautes}>
                  <div>
                    <ul className="">
                      <li>
                        <NavigationMenuLink asChild className={styles.navigation_link_titre}>
                          <h1>Nike</h1>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike Dunk Low
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike Dunk High
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike Air Force 1
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Max
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike Air Max 1
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike x Travis Scott
                      </NavigationMenuLink>
                    </Link>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <NavigationMenuLink asChild className={styles.navigation_link_titre}>
                          <h1>Air Jordan</h1>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 1
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 1 Low
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 1 Mid
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 1 High
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 3
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 4
                      </NavigationMenuLink>
                    </Link>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <NavigationMenuLink asChild className={styles.navigation_link_titre}>
                          <h1>Adidas</h1>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Adidas Campus
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Adidas Handball Spezial
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Adidas Samba
                      </NavigationMenuLink>
                    </Link>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <NavigationMenuLink asChild className={styles.navigation_link_titre}>
                          <h1>New Balance</h1>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        New Balance 1906r
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        New Balance 2002r
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        New Balance 9060
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.test}>
              <NavigationMenuTrigger className={styles.navigation_item1}>Femme</NavigationMenuTrigger>
              <NavigationMenuContent className={styles.container_content}>
              <div className={styles.container_nouveautes}>
                  <div>
                    <ul>
                      <li>
                        <NavigationMenuLink asChild className={styles.navigation_link_titre}>
                          <h1>Nike</h1>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike Dunk Low
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike Dunk High
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike Air Force 1
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Max
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike Air Max 1
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Nike x Travis Scott
                      </NavigationMenuLink>
                    </Link>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <NavigationMenuLink asChild className={styles.navigation_link_titre}>
                          <h1>Air Jordan</h1>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 1
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 1 Low
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 1 Mid
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 1 High
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 3
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Air Jordan 4
                      </NavigationMenuLink>
                    </Link>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <NavigationMenuLink asChild className={styles.navigation_link_titre}>
                          <h1>Adidas</h1>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Adidas Campus
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Adidas Handball Spezial
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        Adidas Samba
                      </NavigationMenuLink>
                    </Link>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <NavigationMenuLink asChild className={styles.navigation_link_titre}>
                          <h1>New Balance</h1>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        New Balance 1906r
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        New Balance 2002r
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/jordan4">
                      <NavigationMenuLink className={styles.navigation_link}>
                        New Balance 9060
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
