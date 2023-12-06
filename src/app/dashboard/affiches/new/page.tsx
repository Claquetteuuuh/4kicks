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


  const [categories, setCategories] = useState<CategorieType[]>();
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [images, setImages] = useState<FileList>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [callToActionUrl, setCallToActionUrl] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const router = useRouter();
  const data = new FormData();
  
  const [img, setImg] = useState<File>()

  useEffect(() => {
    axios
      .get("/api/dashboard/categories")
      .then((e) => {
        setCategoriesSelected(e.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("file", img);

      axios
      .post("/api/dashboard/affiches", {
        new_title: title,
        new_description: description,
        new_subtitle: subtitle,
        new_callToAction: callToAction,
        new_callToActionUrl: callToActionUrl,
        data: data

      })
      .then((e) => {
        router.refresh();
        axios
          .get("/api/dashboard/affiches")
          .then((e) => {
            console.log(e)
          })
          .catch((err) => {

            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
    } catch (err: any) {
      console.error(err);
    }
    console.log(data)
    
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
              data.set("image", e.target.files[0])
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
        {categories ? (
          <CategoriesCheckboxContainer
            categories={categories}
            setState={setCategoriesSelected}
            state={categoriesSelected}
          />
        ) : (
          false
        )}
        <input type="submit"></input>
      </form>
    </DashboardLayout>
  );
};

export default Page;
