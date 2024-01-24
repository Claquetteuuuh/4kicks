"use client";

import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import ConnButton from "@/components/plainButton/plainButton";
import Link from "next/link";
import ConnectionLayout from "@/components/connectionLayout/ConnectionLayout";
import TextInput from "@/components/TextInput/TextInput";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { userType } from "../../../types/global/UserType";
import axios from "axios";
import CheckAccountLayout from "@/components/checkAccountLayout/CheckAccountLayout";

const Login = ({ params }: { params: { user: userType } }) => {
  const router = useRouter();
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();

  const googleConnectionHandler = () => {
    signIn("google");
  };
  const githubConnectionHandler = () => {
    signIn("github");
  };

  useEffect(() => {
    if (params.user) {
      router.push("/")
      router.refresh();
    }
  }, [params]);

  const subForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email: identifiant,
      password: password,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.push("/");
        router.refresh();
      }
      if (callback?.error) {
        console.log("there is an error !");
      }
    });
  };

  return (
    <ConnectionLayout>
      <CheckAccountLayout user={params.user}>
        <div className={styles.login}>
          <div className={styles.container}>
            <ConnButton
              imgAlt="Google icon"
              img="/icons/google.png"
              text="Se connecter avec Google"
              onClick={() => {
                googleConnectionHandler();
              }}
            />
            <ConnButton
              imgAlt="Github icon"
              img="/icons/github.svg"
              text="Se connecter avec Github"
              color="black"
              onClick={() => {
                githubConnectionHandler();
              }}
            />
            <p className={styles.separate}>or</p>

            <form onSubmit={(e) => subForm(e)}>
              <TextInput
                state={identifiant}
                setState={setIdentifiant}
                placeholder="email"
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
            <p className={styles.psswd}>Mot de passe oublié ?</p>
            <Link href={`signup`} className={styles.bottomTxt}>
              Je n&apos;ai pas de compte, m&apos;enregistrer
            </Link>
            <Link href={`.`} className={styles.bottomTxt}>
              <img src="/icons/home.svg" alt="House" />
              <span>Retour au menu</span>
            </Link>
          </div>
        </div>
      </CheckAccountLayout>
    </ConnectionLayout>
  );
};

export default Login;
