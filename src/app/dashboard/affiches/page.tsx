"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../types/global/UserType";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import styles from "./affiches.module.css";
import AfficheTable from "@/components/AfficheTable/AfficheTable";
import { AfficheType } from "../../../../types/dashboard/AfficheType";
import {useRouter} from "next/navigation"

const Page = ({ params }: { params: { user: userType } }) => {
    const [affiches, setaffiches] = useState<AfficheType[]>([]);
    const { toast } = useToast();
    const router = useRouter();

    const confirmDelete = (id: string) => {
        axios.delete("/api/dashboard/affiches", {
            headers: {
                affiche_uid: id,
            }
        })
            .then(e => {
                router.refresh();
        axios
          .get("/api/dashboard/affiches")
          .then((e) => {
            setaffiches(e.data);
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
            title: "Delete affiches",
            description: `Are you sure to delete ${id} ?`,
            action: (
                <ToastAction className={styles.toast_delete_button} onClick={(e) => confirmDelete(id)} altText="Delete affiche">Delete</ToastAction>
            )
        })
    }

    useEffect(() => {
        axios
            .get("/api/dashboard/affiches")
            .then((e) => {
                setaffiches(e.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <DashboardLayout params={params}>
            <AfficheTable data={affiches} handleDelete={handleDelete} />
        </DashboardLayout>
    );
};

export default Page;
