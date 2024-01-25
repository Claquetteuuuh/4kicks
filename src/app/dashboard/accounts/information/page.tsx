"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../../types/global/UserType";
import axios from "axios";
import { CategorieType } from "../../../../../types/dashboard/CategorieType";
import CategoriesCheckboxContainer from "@/components/CategoriesCheckboxContainer/CategoriesCheckboxContainer";
import styles from "./information.module.css"
import TextInput from "@/components/TextInput/TextInput";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { AchatProductType, AchatsType } from "../../../../../types/dashboard/AchatsType";
import SelectInput from "@/components/selectInput/SelectInput";
import { AccountType } from "../../../../../types/dashboard/AccountType";




const Page = ({ params }: { params: { user: userType } }) => {

  const param = useSearchParams()
  const account_uid = param?.get('accountUID')
  const [account, setAccount] = useState<AccountType>();
  const [permission, setPermission] = useState<string>("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    modifPerm();
  };

  useEffect(() => {
    axios.get('/api/dashboard/accounts?accountUID=' + account_uid)
      .then((response) => {
        console.log(response)
        setAccount(response.data)
        setPermission(response.data.permission)

      })
      .catch((err) => {
        console.error(err)
      })
  }, [account_uid]);

  const modifPerm = () => {
    axios.put('/api/dashboard/accounts', {
      account_uid: account?.account_uid,
      permission: permission,

    })
      .then((response) => {
        console.log(response)

      })
      .catch((err) => {
        console.error(err)
      })
  }




  return (
    <DashboardLayout params={params}>
      <div className={styles.container_account_uid}>
        <p className={styles.account_uidA}>Account uid:</p>
        <p className={styles.account_uidB}> {account?.account_uid}</p>
      </div>
      <div className={styles.container_completed}>
        <p className={styles.completedA}>Completed:</p>
        <p className={styles.completedB}> {account?.completed === true ? 'true' : 'false'}</p>
      </div>
      <div className={styles.container_creation_date}>
        <p className={styles.creation_dateA}>Date:</p>
        <p className={styles.creation_dateB}> {account?.creation_date}</p>
      </div>
      <div className={styles.container_connection_type}>
        <p className={styles.connection_typeA}>Address uid:</p>
        <p className={styles.connection_typeB}> {account?.connection_type}</p>
      </div>
      <div className={styles.container_email}>
        <p className={styles.emailA}>Email:</p>
        <p className={styles.emailB}> {account?.email}</p>
      </div>
      <div className={styles.container_first_name}>
        <p className={styles.first_nameA}>First name:</p>
        <p className={styles.first_nameB}> {account?.first_name}</p>
      </div>
      <div className={styles.container_last_name}>
        <p className={styles.last_nameA}>Last name:</p>
        <p className={styles.last_nameB}> {account?.last_name}</p>
      </div>
      <div className={styles.container_newsletter}>
        <p className={styles.newsletterA}>Newsletter:</p>
        <p className={styles.newsletterB}> {account?.newsletter === true ? 'true' : 'false'}</p>
      </div>
      <div className={styles.container_permission}>
        <p className={styles.permissionA}>Permission:</p>
        <p className={styles.permissionB}> {permission}</p>
      </div>
      <div className={styles.container_preference}>
        <p className={styles.preferenceA}>Preference:</p>
        <p className={styles.preferenceB}> {account?.preference}</p>
      </div>
      <div className={styles.container_username}>
        <p className={styles.usernameA}>UserName:</p>
        <p className={styles.usernameB}> {account?.username}</p>
      </div>
      <div className={styles.container_validated}>
        <p className={styles.validatedA}>Validated:</p>
        <p className={styles.validatedB}> {account?.validated === true ? 'true' : 'false'}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <SelectInput elements={["USER", "MODERATOR", "ADMIN"]} setState={setPermission} state={permission} placeholder={"Permission"} />
        <input type="submit" value={"envoyer"} />
      </form>


    </DashboardLayout>
  );
};

export default Page;
