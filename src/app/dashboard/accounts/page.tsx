"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../types/global/UserType";
import axios from "axios";
import CategorieTable from "@/components/CategorieTable/CategorieTable";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import styles from "./accounts.module.css";
import { AccountType } from "../../../../types/dashboard/AccountType";
import AccountTable from "@/components/AccountTable/AccountTable";
import { usePathname, useRouter } from "next/navigation";

const Page = ({ params }: { params: { user: userType } }) => {
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const confirmDelete = (id: string) => {
    axios
      .delete("/api/dashboard/accounts", {
        headers: {
          account_uid: id,
        },
      })
      .then((e) => {
        router.refresh();
        axios
          .get("/api/dashboard/accounts")
          .then((e) => {
            setAccounts(e.data);
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
      .get("/api/dashboard/accounts")
      .then((e) => {
        setAccounts(e.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <DashboardLayout params={params}>
      <AccountTable data={accounts} handleDelete={handleDelete} />
    </DashboardLayout>
  );
};

export default Page;
