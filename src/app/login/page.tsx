"use client";

import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import ConnButton from "@/components/plainButton/plainButton";
import TextInput from "@/components/textInput/TextInput";
import Link from "next/link";
import ConnectionLayout from "@/components/connectionLayout/ConnectionLayout";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as jose from "jose";

const Login = () => {
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();

  const { data: session, status } = useSession();
  const error = params?.get("error");
  const provider = params?.get("provider");

  useEffect(() => {
    if (status === "authenticated") {
      const jwt_key = process.env.client_jwt_key;
      if (jwt_key) {
        new jose.SignJWT({ email: session.user?.email })
          .setExpirationTime("1h")
          .setProtectedHeader({ alg: "HS256" })
          .sign(new TextEncoder().encode(jwt_key))
          .then((token) => {
            axios
              .post(
                "/api/auth/get_cookie",
                {
                  email: session.user?.email,
                  conn: provider,
                },
                {
                  headers: { token: token },
                }
              )
              .then((e) => {
                console.log(e.data);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [status]);

  const router = useRouter();

  const handlerGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "http://localhost:3000/login?provider=GOOGLE",
    });
  };

  const handlerGithubLogin = () => {
    signIn("github", {
      callbackUrl: "http://localhost:3000/login?provider=GITHUB",
    });
  };

  const subForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("credentials", {
      email: identifiant,
      password: password,
      callbackUrl: "/",
    });
  };

  return (
    <ConnectionLayout>
      <div className={styles.login}>
        <div className={styles.container}>
          <ConnButton
            imgAlt="Google icon"
            img="/icons/google.png"
            text="Se connecter avec Google"
            onClick={() => {
              handlerGoogleLogin();
            }}
          />
          <ConnButton
            imgAlt="Github icon"
            img="/icons/github.svg"
            text="Se connecter avec Github"
            color="black"
            onClick={() => {
              handlerGithubLogin();
            }}
          />
          <p className={styles.separate}>or</p>

          <form onSubmit={(e) => subForm(e)}>
            <TextInput
              state={identifiant}
              setState={setIdentifiant}
              placeholder="username or email"
              required={true}
            />
            <TextInput
              state={password}
              setState={setPassword}
              placeholder="password"
              type="password"
              required={true}
            />
            <ConnButton type="submit" onClick={subForm} text="Se connecter" />
          </form>
          <p className={styles.error}>{error}</p>
          <p className={styles.psswd}>Mot de passe oublié ?</p>
          <Link href={`signup`} className={styles.bottomTxt}>
            Je n'ai pas de compte, m'enregistrer
          </Link>
          <Link href={`.`} className={styles.bottomTxt}>
            <img src="/icons/home.svg" alt="House" />
            <span>Retour au menu</span>
          </Link>
        </div>
      </div>
    </ConnectionLayout>
  );
};

export default Login;