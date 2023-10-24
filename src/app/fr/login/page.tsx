"use client";

import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import ConnButton from "@/components/plainButton/plainButton";
import TextInput from "@/components/textInput/TextInput";
import Link from "next/link";
import ConnectionLayout from "@/components/connectionLayout/ConnectionLayout";

const Login = () => {
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");

  const subForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(identifiant);
    console.log(password);
  };

  return (
    <ConnectionLayout>
      <div className={styles.login}>
          <div className={styles.container}>
            <ConnButton
              imgAlt="Google icon"
              img="/icons/google.png"
              text="Se connecter avec Google"
            />
            <ConnButton
              imgAlt="Apple icon"
              img="/icons/apple.png"
              text="Se connecter avec Apple"
              color="black"
            />
            <p className={styles.separate}>or</p>

            <form onSubmit={(e) => subForm(e)}>
              <TextInput
                state={identifiant}
                setState={setIdentifiant}
                placeholder="username or email"
              />
              <TextInput
                state={password}
                setState={setPassword}
                placeholder="password"
                type="password"
              />
              <ConnButton type="submit" onClick={subForm} text="Se connecter" />
            </form>
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
