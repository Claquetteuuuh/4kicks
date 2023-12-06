"use client";
import React, { useEffect, useState } from "react";
import { userType } from "../../../types/global/UserType";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import CheckAccountLayout from "@/components/checkAccountLayout/CheckAccountLayout";
import styles from "./profile.module.css";
import TextInput from "@/components/TextInput/TextInput";
import SelectInput from "@/components/selectInput/SelectInput";
import PlainButton from "@/components/plainButton/plainButton";
import Loading from "@/components/Loading/Loading";

const Page = ({ params }: { params: { user: userType } }) => {
  const router = useRouter();

  const preferences = ["Homme", "Femme", "Mix"];

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(preferences[0]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (params.user === null) {
      router.push("/login");
    } else {
      if (params.user) {
        setUsername(params.user.username);
        setFirstName(params.user.first_name);
        setLastName(params.user.last_name);
        setEmail(params.user.email);
      }
    }
  }, [params]);

  return (
    <>
      {params.user ? (
        <CheckAccountLayout user={params.user}>
          <div className={styles.container}>
            <div className={styles.general}>
              <div className={styles.profile_picture}>
                <img
                  src={
                    params.user.image
                      ? params.user.image
                      : "/icons/default_pp.png"
                  }
                  alt={
                    params.user.image
                      ? `image of ${params.user.username}`
                      : "default profile picture"
                  }
                />
                <PlainButton
                  text="Deconnection"
                  color="black"
                  onClick={() => signOut().then((e) => router.push("/login"))}
                />
                {params.user.permission != "USER" ? (
                  <PlainButton
                    text="Dashboard"
                    color="black"
                    onClick={() => router.push("/dashboard")}
                  />
                ) : (
                  false
                )}
              </div>
              <div className={styles.personal_info}>
                <TextInput
                  className={styles.input}
                  placeholder="Username"
                  setState={setUsername}
                  state={username}
                />
                <TextInput
                  className={styles.input}
                  placeholder="First name"
                  setState={setFirstName}
                  state={firstName}
                />
                <TextInput
                  className={styles.input}
                  placeholder="Last name"
                  setState={setLastName}
                  state={lastName}
                />
                <SelectInput
                  elements={preferences}
                  setState={setGender}
                  state={gender}
                  placeholder="Genre"
                />
              </div>
              <div className={styles.connection_info}>
                <div className={styles.connection}>
                  <p className={styles.type}>Connection Type</p>
                  <p>{params.user.connection_type}</p>
                </div>
                <TextInput
                  className={styles.input}
                  placeholder="Email"
                  setState={setEmail}
                  state={email}
                />
                <PlainButton
                  className={styles.button}
                  text="Reinitialiser le mot de passe"
                />
                <PlainButton
                  className={`${styles.save} ${styles.button}`}
                  text="Sauvegarder"
                />
              </div>
            </div>
          </div>
        </CheckAccountLayout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Page;
