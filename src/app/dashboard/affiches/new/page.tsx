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


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [callToActionUrl, setCallToActionUrl] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const data = new FormData();
  
  const [img, setImg] = useState<File>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!img){
      return;
    }
    const data = new FormData();
    data.set("file", img)
    data.set("new_title", title)
    data.set("new_subtitle", subtitle)
    data.set("new_callToAction", callToAction)
    data.set("new_callToActionUrl", callToActionUrl)
    data.set("new_description", description)

    const res = await fetch("/api/dashboard/affiches/create", {
      method: "POST",
      body: data,
    })
    if (!res.ok) throw new Error(await res.text());
    const resData = await res.json();
    console.log(resData)
  };



  return (
    <DashboardLayout params={params}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput required state={title} setState={setTitle} placeholder="Title" />
        <TextInput required state={description} setState={setDescription} placeholder="description" />
        <TextInput required state={callToAction} setState={setCallToAction} placeholder="call to action" />
        <TextInput required state={subtitle} setState={setSubtitle} placeholder="complement subtitle" />
        <TextInput required state={callToActionUrl} setState={setCallToActionUrl} placeholder="call to action url" />
        <input
          type="file"
          title="file"
          accept="image/*"
          onChange={(e) => {
            if(e.target.files?.[0]){
              setImg(e.target.files[0])
            }
          }

          }
          id="img"
        />
        {
          img ?
            <img key={img.name} src={URL.createObjectURL(img)} alt={img.name} />
            :
            false
        }
        <input type="submit" value={"envoyer"}/>
      </form>
    </DashboardLayout>
  );
};

export default Page;
