"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../../types/global/UserType";
import axios from "axios";
import { CategorieType } from "../../../../../types/dashboard/CategorieType";
import CategoriesCheckboxContainer from "@/components/CategoriesCheckboxContainer/CategoriesCheckboxContainer";
import styles from "./new.module.css"
import TextInput from "@/components/TextInput/TextInput";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { user: userType } }) => {


  const [name, setName] = useState("");

  const data = new FormData();


  const handleSubmit = async (e: React.FormEvent) => {
    const header = new Headers();
    header.set("new_name", name)
    const res = await fetch("/api/dashboard/categories", {
      method: "POST",
      headers: header,
    })
    if (!res.ok) throw new Error(await res.text());
    const resData = await res.json();
    console.log(resData)
  };



  return (
    <DashboardLayout params={params}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput required state={name} setState={setName} placeholder="Name" />
        <input type="submit" value={"envoyer"} />
      </form>
    </DashboardLayout>
  );
};

export default Page;
