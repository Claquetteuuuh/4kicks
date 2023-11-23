"use client";

import React, { useState, useEffect } from "react";
import styles from "./signup.module.css";
import ConnButton from "@/components/plainButton/plainButton";
import TextInput from "@/components/textInput/TextInput";
import Link from "next/link";
import ConnectionLayout from "@/components/connectionLayout/ConnectionLayout";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import * as jose from "jose";

const Signup = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const jwt_key = process.env.client_jwt_key;
      if (jwt_key) {
        new jose.SignJWT({ email: session.user?.email })
          .setExpirationTime("1h")
          .setProtectedHeader({ alg: "HS256" })
          .sign(new TextEncoder().encode(jwt_key))
          .then((token) => {
            setLoading(true);
            console.log(session);
            axios
              .get("/api/users/", {
                headers: {
                  token: token,
                },
              })
              .then((e) => {
                setLoading(false);
                if (e.data.completed === false) {
                  router.push(`signup/complete?conn=other`);
                } else {
                  router.push(".");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("cannot load token");
      }
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
                  signIn("google");
                }}
              />
              <ConnButton
                imgAlt="Apple icon"
                img="/icons/apple.png"
                text="S'enregistrer avec Apple"
                color="black"
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
