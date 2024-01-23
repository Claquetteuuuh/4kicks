"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../types/global/UserType";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import styles from "./avis.module.css";
import { AvisType } from "../../../../types/dashboard/AvisType";
import AvisTable from "@/components/AvisTable/AvisTable";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { user: userType } }) => {
    const [avis, setavis] = useState<AvisType[]>([]);
    const { toast } = useToast();
    const router = useRouter();

    const confirmDelete = (id: string) => {
        axios.delete("/api/dashboard/avis", {
            headers: {
                avis_uid: id,
            }
        })
            .then(e => {
                router.refresh();
                axios
                    .get("/api/dashboard/products")
                    .then((e) => {
                        setavis(e.data);
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
            title: "Delete avis",
            description: `Are you sure to delete ${id} ?`,
            action: (
                <ToastAction className={styles.toast_delete_button} onClick={(e) => confirmDelete(id)} altText="Delete avis">Delete</ToastAction>
            )
        })
    }

    useEffect(() => {
        axios
            .get("/api/dashboard/avis")
            .then((e) => {
                setavis(e.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    return (
        <DashboardLayout params={params}>
            <AvisTable data={avis} handleDelete={handleDelete} />
        </DashboardLayout>
    );
};

export default Page;