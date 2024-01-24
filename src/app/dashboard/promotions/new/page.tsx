"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../../types/global/UserType";
import styles from "./new.module.css"
import TextInput from "@/components/TextInput/TextInput";
import axios from "axios";

const Page = ({ params }: { params: { user: userType } }) => {

  const [code, setCode] = useState("");
  const [coefficient, setCoefficient] = useState("");

  const data = new FormData();


  const handleSubmit = async (e: React.FormEvent) => {

    if(Number.isNaN(parseFloat(coefficient))){
      console.error("Le coefficient doit être un nombre.");
      return;
    }
  
    if (parseFloat(coefficient) <= 0 ||  parseFloat(coefficient)>= 1) {
      console.error("Le coefficient doit être compris entre 0 et 1.");
      return;
    }
    axios.post('/api/dashboard/promotions', {
      new_code: code,
      new_coefficient: coefficient
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
        <TextInput required state={code} setState={setCode} placeholder="Code" />
        <TextInput required state={coefficient} setState={setCoefficient} placeholder="Coefficient" />
        <input type="submit" value={"envoyer"} />
      </form>
    </DashboardLayout>
  );
};

export default Page;
