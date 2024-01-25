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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [complementDescription, setComplementDescription] = useState("");
  const [marque, setMarque] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/dashboard/categories')
      .then((response) => {
        console.log(response)
        setCategories(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, []);

  

  const handleSubmit = async (e: React.FormEvent) => {

    // creation produit

    e.preventDefault();
    
    if (!images) {
      return;
    }
    const data = new FormData();
    let i = 0;
    Array.from(images).forEach(img => {
      i += 1;
      data.set(`file${i}`, img)
    });
    data.set("new_name", name)
    data.set("new_price", price)
    data.set("new_complementDescription", complementDescription)
    data.set("new_marque", marque)
    data.set("new_description", description)

    const res = await fetch("/api/dashboard/products/create", {
      method: "POST",
      body: data,
    })
    if (!res.ok) throw new Error(await res.text());
    const resData = await res.json();
    console.log(resData.produit)

    // creation productCategories
    categoriesSelected.forEach(async thisCat=>{
      console.log(thisCat)
      await axios.post('/api/dashboard/productCategorie',{
        product_uid: resData.produit,
        add_categorie_uid: thisCat as string
      })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
    })
  };
  return (
    <DashboardLayout params={params}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput required state={name} setState={setName} placeholder="Name" />
        <TextInput required state={description} setState={setDescription} placeholder="description" />
        <TextInput required state={price} setState={setPrice} placeholder="price" />
        <TextInput required state={complementDescription} setState={setComplementDescription} placeholder="complement description" />
        <TextInput required state={marque} setState={setMarque} placeholder="marque" />

        <input
          type="file"
          title="file"
          accept="image/*"
          multiple
          max={4}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImages(e.target.files)
            }
          }

          }
          id="img"
        />
        {
          images ?
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
        <input type="submit"></input>
      </form>
    </DashboardLayout>
  );
};
type ListItem = {
  id: number;
  label: string;
};

export default Page;
