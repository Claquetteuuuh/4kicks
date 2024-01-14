"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../types/global/UserType";
import axios from "axios";
import { CategorieType } from "../../../../types/dashboard/CategorieType";
import CategorieTable from "@/components/CategorieTable/CategorieTable";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import styles from "./categories.module.css";
import { usePathname, useRouter } from "next/navigation";

const Page = ({ params }: { params: { user: userType } }) => {
  const [categories, setCategories] = useState<CategorieType[]>([]);
  const { toast } = useToast()
  const router = useRouter();
 
  const confirmDelete = (id: string) => {
    axios.delete("/api/dashboard/categories", {
      headers: {
        categorie_uid: id,
      }
    })
      .then(e => {
        router.refresh();
        axios
          .get("/api/dashboard/categories")
          .then((e) => {
            setCategories(e.data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err)
      })
  }
  const handleDelete = (id: string) => {
  
    toast({
      className: styles.toast_delete,
      title: "Delete categorie",
      description: `Are you sure to delete ${id} ?`,
      action: (
        <ToastAction className={styles.toast_delete_button} onClick={(e) => confirmDelete(id)} altText="Delete categorie">Delete</ToastAction>
      )
    })
  }

  useEffect(() => {
    axios
      .get("/api/dashboard/categories")
      .then((e) => {
        setCategories(e.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <DashboardLayout params={params}>
      <CategorieTable data={categories} handleDelete={handleDelete} />
    </DashboardLayout>
  );
};

export default Page;
