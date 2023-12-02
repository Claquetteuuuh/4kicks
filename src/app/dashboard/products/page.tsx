"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../types/global/UserType";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import styles from "./products.module.css";
import { ProductType } from "../../../../types/dashboard/ProductType";
import ProductTable from "@/components/ProductTable/ProductTable";
import { usePathname, useRouter } from "next/navigation";

const Page = ({ params }: { params: { user: userType } }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const confirmDelete = (id: string) => {
    axios
      .delete("/api/dashboard/products", {
        headers: {
          product_uid: id,
        },
      })
      .then((e) => {
        router.refresh();
        axios
          .get("/api/dashboard/products")
          .then((e) => {
            setProducts(e.data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleDelete = (id: string, email: string) => {
    toast({
      className: styles.toast_delete,
      title: "Delete categorie",
      description: `Are you sure to delete ${email} ?`,
      action: (
        <ToastAction
          className={styles.toast_delete_button}
          onClick={(e) => confirmDelete(id)}
          altText="Delete categorie"
        >
          Delete
        </ToastAction>
      ),
    });
  };

  useEffect(() => {
    axios
      .get("/api/dashboard/products")
      .then((e) => {
        setProducts(e.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <DashboardLayout params={params}>
      <ProductTable data={products} handleDelete={handleDelete} />
    </DashboardLayout>
  );
};

export default Page;
