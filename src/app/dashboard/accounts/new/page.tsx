"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../../types/global/UserType";
import { Permission, Preference, Prisma } from "@prisma/client";
import axios from "axios";
import { CategorieType } from "../../../../../types/dashboard/CategorieType";
import CategoriesCheckboxContainer from "@/components/CategoriesCheckboxContainer/CategoriesCheckboxContainer";
import styles from "./new.module.css"
import TextInput from "@/components/TextInput/TextInput";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/selectInput/SelectInput";

const Page = ({ params }: { params: { user: userType } }) => {


  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [preference, setPreference] = useState("");
  const [permission, setPermission] = useState("");
  const data = new FormData();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("testtttttttttt")
  
    axios.post('/api/dashboard/accounts', {
      email: email,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
      preference: preference,
      permission: permission
    })
    .then(e => {
      console.log(e)
    })
    .catch(err => {
      console.error(err)
    })
  };



  return (
    <DashboardLayout params={params}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput required state={email} setState={setEmail} placeholder="email" />
        <TextInput required state={userName} setState={setUserName} placeholder="pseudo" />
        <TextInput required state={firstName} setState={setFirstName} placeholder="first name" />
        <TextInput required state={lastName} setState={setLastName} placeholder="last name" />
        <SelectInput elements={[Preference.MALE, Preference.FEMALE, Preference.MIXE]} setState={setPreference} state={preference} placeholder={"Preference"} />
        <TextInput required state={password} setState={setPassword} placeholder="password" type="password" />
        <SelectInput elements={[Permission.ADMIN, Permission.USER, Permission.MODERATOR]} setState={setPermission} state={permission} placeholder={"Permission"} />
        <input type="submit" value={"envoyer"} />
      </form>
    </DashboardLayout>
  );
};

export default Page;
