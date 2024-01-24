"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../types/global/UserType";
import axios from "axios";
import { AchatsType } from "../../../../types/dashboard/AchatsType";
import CategorieTable from "@/components/CategorieTable/CategorieTable";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import styles from "./information.module.css";
import { usePathname, useRouter } from "next/navigation";
import StatsTable from "@/components/commandesTable/CommandesTable";

const Page = ({ params }: { params: { user: userType } }) => {
  const [achats, setAchats] = useState<AchatsType[]>([]);
  const { toast } = useToast()
  const router = useRouter();

  const confirmDelete = (id: string) => {
    axios.delete("/api/dashboard/commandes", {
      headers: {
        categorie_uid: id,
      }
    })
      .then(e => {
        router.refresh();
        axios
          .get("/api/dashboard/commandes")
          .then((e) => {
            setAchats(e.data);
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
      title: "Delete achat",
      description: `Are you sure to delete ${id} ?`,
      action: (
        <ToastAction className={styles.toast_delete_button} onClick={(e) => confirmDelete(id)} altText="Delete categorie">Delete</ToastAction>
      )
    })
  }

  useEffect(() => {
    axios
      .get("/api/dashboard/commandes")
      .then((e) => {
        setAchats(e.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <DashboardLayout params={params}>
      <StatsTable data={achats} />
    </DashboardLayout>
  );
};

export default Page;
