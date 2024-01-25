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
import { TailleType } from "../../../../../types/dashboard/TailleType";
import TaillesCheckboxContainer from "@/components/TailleCheckBoxContainer/TaillesCheckboxContainer";
import { ColorType } from "../../../../../types/dashboard/ColorType";
import ColorsCheckboxContainer from "@/components/ColorsCheckboxContainer/CategoriesCheckboxContainer/ColorsCheckboxContainer";

const Page = ({ params }: { params: { user: userType } }) => {

  const [categories, setCategories] = useState<CategorieType[]>();
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [tailles, setTailles] = useState<TailleType[]>();
  const [taillesSelected, setTaillesSelected] = useState([]);
  const [colors, setColors] = useState<ColorType[]>();
  const [colorsSelected, setColorsSelected] = useState([]);
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

  useEffect(() => {
    axios.get('/api/dashboard/tailles')
      .then((response) => {
        console.log(response)
        setTailles(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, []);

  useEffect(() => {
    axios.get('/api/dashboard/colors')
      .then((response) => {
        console.log(response)
        setColors(response.data)
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
    categoriesSelected.forEach(async thisCat => {

      await axios.post('/api/dashboard/productCategorie', {
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

    // creation productTaille

    taillesSelected.forEach(async thisTaille => {
      console.log("taille :" +thisTaille)
      await axios.post('/api/dashboard/productTaille', {
        product_uid: resData.produit,
        add_taille_uid: thisTaille as string
      })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.error(err)
        })
    })

    // creation productColor

    colorsSelected.forEach(async thisColor => {
      await axios.post('/api/dashboard/productColor', {
        product_uid: resData.produit,
        add_color_uid: thisColor as string
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
        <div className={styles.checkBox}>
        {categories ? (
          <CategoriesCheckboxContainer
            categories={categories}
            setState={setCategoriesSelected}
            state={categoriesSelected}
          />
        ) : (
          false
        )}

        {colors ? (
          <ColorsCheckboxContainer
            colors={colors}
            setState={setColorsSelected}
            state={colorsSelected}
          />
        ) : (
          false
        )}
        {tailles ? (
          <TaillesCheckboxContainer
            tailles={tailles}
            setState={setTaillesSelected}
            state={taillesSelected}
          />
        ) : (
          false
        )}
        </div>
        
        
        <input type="submit"></input>
      </form>
    </DashboardLayout>
  );
};


export default Page;
