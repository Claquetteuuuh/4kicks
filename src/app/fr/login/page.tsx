"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/login.module.css";
import ConnButton from "@/components/connectionButton/ConnButton";
import TextInput from "@/components/textInput/textInput";

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  return (
    <div className={styles.login}>
      <div className={styles.background}>
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

          <form>
            <TextInput value={username} state={setUsername} placeholder="username" />
            <TextInput value={password} state={setPassword} placeholder="password" type="password"/>
            <ConnButton text="Se connecter" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
