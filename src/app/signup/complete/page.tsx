"use client";

import ConnectionLayout from "@/components/connectionLayout/ConnectionLayout";
import React, { useState, useEffect, ReactHTMLElement } from "react";
import styles from "./complete.module.css";
import TextInput from "@/components/TextInput/TextInput";
import { useSearchParams, useRouter } from "next/navigation";
import SelectInput from "@/components/selectInput/SelectInput";
import PlainButton from "@/components/plainButton/plainButton";
import CheckBox from "@/components/checkBox/CheckBox";
import { useSession } from "next-auth/react";
import axios from "axios";
import { userType } from "../../../../types/global/UserType";
import { ToastAction } from "@/components/ui/toast"
import { toast, useToast } from "@/components/ui/use-toast"

const Page = ({ params }: { params: { user: userType } }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const emailParams = searchParams?.get("email");

  const [loading, setLoading] = useState<boolean>(false);

  const preferences = ["Homme", "Femme", "Mix"];

  const [connectionType, setConnectionType] = useState(params.user?.email);
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
    if (params.user) {
      setConnectionType(params.user.connection_type);
      if (params.user.completed) {
        router.push("/");
        router.refresh();
      }
    }
  }, [params.user]);

  const createToast = (type: "error" | "info", description: string) => {
    toast({
      className: styles.toast,
      title: "Erreur",
      description: "Les deux mots de passes ne correspondent pas !",
    })
  };

  const handleResendEmail = () => {
    let email = emailParams;
    if (!email) {
      if (!params.user) {
        return;
      }
      email = params.user.email;
    }

    axios.get("/api/email/confirm_code", {
      headers: {
        email: email,
      },
    });
  };

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let email = emailParams;
    if (!email) {
      email = params.user.email;
    }
    if (password !== confPassword) {
      createToast("error", "les mots de passe correspondent pas");
      return;
    }
    const index = preferences.indexOf(preference);
    let pref = "MALE";
    switch (index) {
      case 1:
        pref = "MALE";
        break;
      case 2:
        pref = "FEMALE";
        break;
      case 3:
        pref = "MIXE";
        break;
      default:
        break;
    }
    setLoading(true);
    axios
      .post(
        "/api/auth/complete",
        {
          username: username,
          first_name: firstName,
          last_name: lastName,
          password: password,
          preference: pref,
          newsletter: acceptPromo,
        },
        {
          headers: {
            email: email,
          },
        }
      )
      .then((e) => {
        setLoading(false);
        router.push("/login");
        router.refresh();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ConnectionLayout>
      <div className={styles.complete}>
        <div className={styles.container}>
          {!loading ? (
            <>
              <h1>Completer l&apos;inscription</h1>
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
                  {connectionType == "EMAIL" ? (
                    <>
                      <div className={styles.mail}>
                        <p>
                          Un email à été envoyé à{" "}
                          <span>{params.user.email}</span>
                        </p>
                        <p>
                          Vérifie ta boite mail !{" "}
                          <span onClick={(e) => handleResendEmail()}>
                            Renvoyer le code
                          </span>{" "}
                        </p>
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
                    text="En soumettant ces données, vous acceptez qu'elles soient traitées conformément à notre politique de confidentialité"
                    state={acceptCond}
                    setState={setAcceptCond}
                    required={true}
                  />
                  <CheckBox
                    placeholder="acceptPromo"
                    text="Je consens volontiers à recevoir des courriels promotionnels de la part de 4kiks et de ces partenaires"
                    state={acceptPromo}
                    setState={setAcceptPromo}
                  />
                  <PlainButton text="Completer" type="submit" />
                </div>
              </form>
            </>
          ) : (
            <img
              className={styles.loading}
              src="/icons/loading.svg"
              alt="Loading"
            />
          )}
        </div>
      </div>
    </ConnectionLayout>
  );
};

export default Page;
