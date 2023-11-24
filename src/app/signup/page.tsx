"use client";

import React, { useState, useEffect } from "react";
import styles from "./signup.module.css";
import ConnButton from "@/components/plainButton/plainButton";
import TextInput from "@/components/TextInput/TextInput";
import Link from "next/link";
import ConnectionLayout from "@/components/connectionLayout/ConnectionLayout";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import * as jose from "jose";


const Signup = () => {

  const router = useRouter();

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleGithubSignup = () => {
    
  }
  const handleGoogleSignup = () => {

  }

  useEffect(() => {
    if (status === "authenticated") {

    }
  }, [status]);

  const subForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`signup/complete?email=${email}&conn=email`);
  };

  return (
    <ConnectionLayout>
      <div className={styles.signup}>
        <div className={styles.container}>
          {status === "loading" || loading == true ? (
            <img src="/icons/loading.svg" alt="Loading" />
          ) : (
            <>
              <ConnButton
                imgAlt="Google icon"
                img="/icons/google.png"
                text="S'enregistrer avec Google"
                onClick={() => {
                  handleGoogleSignup();
                }}
              />
              <ConnButton
                imgAlt="Github icon"
                img="/icons/github.svg"
                text="S'enregistrer avec Github"
                color="black"
                onClick={() => {
                  handleGithubSignup()
                }}
              />
              <p className={styles.separate}>or</p>

              <form onSubmit={(e) => subForm(e)}>
                <TextInput
                  state={email}
                  setState={setEmail}
                  placeholder="email"
                  type="email"
                  required={true}
                />
                <ConnButton
                  type="submit"
                  onClick={subForm}
                  text="S'enregistrer"
                />
              </form>
              <Link href={`login`} className={styles.bottomTxt}>
              Vous avez déjà un compte?
              </Link>
              <Link href={`.`} className={styles.bottomTxt}>
                <img src="/icons/home.svg" alt="House" />
                <span>Retour au menu</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </ConnectionLayout>
  );
};

export default Signup;
