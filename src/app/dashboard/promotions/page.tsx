"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../types/global/UserType";
import axios from "axios";
import { PromotionType } from "../../../../types/dashboard/PromotionsType";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import styles from "./promotions.module.css";
import { usePathname, useRouter } from "next/navigation";
import PromotionTable from "@/components/PromotionTable/PromotionTable";

const Page = ({ params }: { params: { user: userType } }) => {
  const [promotions, setPromotions] = useState<PromotionType[]>([]);
  const { toast } = useToast()
  const router = useRouter();
 
  const confirmDelete = (id: string) => {
    axios.delete("/api/dashboard/promotions", {
      headers: {
        promo_uid: id,
      }
    })
      .then(e => {
        router.refresh();
        axios
          .get("/api/dashboard/promotions")
          .then((e) => {
            setPromotions(e.data);
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
      .get("/api/dashboard/promotions")
      .then((e) => {
        setPromotions(e.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <DashboardLayout params={params}>
      <PromotionTable data={promotions} handleDelete={handleDelete} />
    </DashboardLayout>
  );
};

export default Page;
