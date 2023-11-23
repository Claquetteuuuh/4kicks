"use client";

import ConnectionLayout from "@/components/connectionLayout/ConnectionLayout";
import React, { useState, useEffect, ReactHTMLElement } from "react";
import styles from "./complete.module.css";
import TextInput from "@/components/textInput/TextInput";
import { useSearchParams, useRouter } from "next/navigation";
import { Combobox } from "@headlessui/react";
import SelectInput from "@/components/selectInput/SelectInput";
import PlainButton from "@/components/plainButton/plainButton";
import CheckBox from "@/components/checkBox/CheckBox";
import { useSession } from "next-auth/react";
import axios from "axios";
import * as jose from "jose";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(false);

  const preferences = ["Homme", "Femme"];

  const [email, setEmail] = useState<string | null | undefined>(searchParams?.get("email"));
  const [connectionType, setConnectionType] = useState(searchParams?.get("conn") || '');
  const [username, setUsername] = useState(searchParams?.get("username") || "");
  const [firstName, setFirstName] = useState(
    searchParams?.get("first_name") || ""
  );
  const [lastName, setLastName] = useState(
    searchParams?.get("last_name") || ""
  );
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [preference, setPreference] = useState(
    searchParams?.get("preference") || ""
  );

  const [confirmCode, setConfirmCode] = useState("");
  const [acceptCond, setAcceptCond] = useState(false);
  const [acceptPromo, setAcceptPromo] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated" && (!email || email == null)) {
      // router.push(".")
    }
    if (status === "authenticated") {
      setEmail(session.user?.email);
      window.history.pushState(
        null,
        "",
        `?username=${username}&first_name=${firstName}&last_name=${lastName}&preference=${preference}&conn=${connectionType}`
      );
    } else {
      window.history.pushState(
        null,
        "",
        `?email=${email}&username=${username}&first_name=${firstName}&last_name=${lastName}&preference=${preference}&conn=${connectionType}`
      );
    }
  }, [username, firstName, lastName, preference, email, status]);

  const createToast = (type: "error" | "info", description: string) => {
    // toast

  };

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confPassword) {
      createToast("error", "les mots de passe correspondent pas")
      return;
    }
    const connectionTypes = ["other", "email"];
    if(!connectionTypes.includes(connectionType)){
      createToast("error", "connection type not available")
      return;
    }
    setLoading(true);
    const jwt_key = process.env.client_jwt_key;
    if (jwt_key) {
      const mailToHash = (connectionType === "email")?email: session?.user?.email;
      new jose.SignJWT({ email: mailToHash })
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(new TextEncoder().encode(jwt_key))
        .then((token) => {
          const body = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            password: password,
            preference: preference,
            promo: acceptPromo,
            connection_type: connectionType,
            email: (connectionType == "email")? email: undefined,
          };
          console.log(body)
          const headers = {
            token: token,
          };
          axios
            .post("/api/users/", body, { headers })
            .then((e) => {
              console.log(e.data);
              if(e.data?.success){
                router.push("./");
              }else{
                console.log(e.data.error)
                if(e.data.already_exists)
                createToast("error", "Error during creation of the account !");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ConnectionLayout>
      <div className={styles.complete}>
        <div className={styles.container}>
          {
            (!loading)?
            <>
              <h1>Completer l'inscription</h1>
            <form onSubmit={(e) => sendForm(e)}>
              <div className={styles.left}>
                <TextInput
                  placeholder="Username"
                  setState={setUsername}
                  state={username}
                  required={true}
                />
                <TextInput
                  placeholder="Prenom"
                  setState={setFirstName}
                  state={firstName}
                  required={true}
                />
                <TextInput
                  placeholder="Nom"
                  setState={setLastName}
                  state={lastName}
                  required={true}
                />
                <TextInput
                  placeholder="Mot de passe"
                  setState={setPassword}
                  state={password}
                  type="password"
                  len={8}
                  required={true}
                />
                <TextInput
                  placeholder="Confirmation mot de passe"
                  setState={setConfPassword}
                  state={confPassword}
                  type="password"
                  len={8}
                  required={true}
                />
                <SelectInput
                  elements={preferences}
                  setState={setPreference}
                  state={preference}
                  placeholder="Preference"

                />
              </div>
              <div className={styles.right}>
                {!session?.user?.email ? (
                  <>
                    <div className={styles.mail}>
                      <p>
                        Un email à été envoyé à <span>{email}</span>
                      </p>
                      <p>Vérifie ta boite mail !</p>
                    </div>
                    <TextInput
                      placeholder="Code de confirmation"
                      setState={setConfirmCode}
                      state={confirmCode}
                      required={true}
                    />
                    <PlainButton text="Confirmer le code" />
                  </>
                ) : (
                  <div style={{ height: "200px" }}></div>
                )}
                <CheckBox
                  placeholder="acceptCond"
                  text="J'accepte les conditions d'utilisation et confirme que j'ai lu les 4kicks pagnan quoicoubeh."
                  state={acceptCond}
                  setState={setAcceptCond}
                  required={true}
                />
                <CheckBox
                  placeholder="acceptPromo"
                  text="Je veux recevoir de gros spams promotionnels que personne veut mais belek j'aurai -70%."
                  state={acceptPromo}
                  setState={setAcceptPromo}
                />
                <PlainButton
                  text="Completer"
                  type="submit"
                />
              </div>
            </form>
          </>
            
          :
          <img className={styles.loading} src="/icons/loading.svg" alt="Loading" />
          }
        </div>
      </div>
    </ConnectionLayout>
  );
};

export default page;
