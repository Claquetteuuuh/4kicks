"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../../types/global/UserType";
import axios from "axios";
import { CategorieType } from "../../../../../types/dashboard/CategorieType";
import CategoriesCheckboxContainer from "@/components/CategoriesCheckboxContainer/CategoriesCheckboxContainer";
import styles from "./new.module.css"
import TextInput from "@/components/TextInput/TextInput";

const Page = ({ params }: { params: { user: userType } }) => {
  const [categories, setCategories] = useState<CategorieType[]>();
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const [images, setImages] = useState<FileList>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios
      .get("/api/dashboard/categories")
      .then((e) => {
        setCategories(e.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleImgChange = (images: FileList) => {
    setImages(images)
  };

  return (
    <DashboardLayout params={params}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput required state={name} setState={setName} placeholder="Name" />
        <TextInput required state={description} setState={setDescription} placeholder="description" />
        <TextInput required state={price} setState={setPrice} placeholder="price" />
        <input
          type="file"
          name="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            e.target.files?.[0] ? handleImgChange(e.target.files) : false
          }
          id="img"
        />
        {
            images? 
            <div className={styles.images_container}>
                {
                    Array.from(images).map(img => {
                        return (
                            <img key={img.name} src={URL.createObjectURL(img)} alt={img.name} />
                        )
                    })
                }
            </div>
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
      </form>
    </DashboardLayout>
  );
};

export default Page;
