"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import styles from "./main_page.module.css";
import CheckAccountLayout from "@/components/checkAccountLayout/CheckAccountLayout";
import { userType } from "../../types/global/UserType";

export default function Home({ params }: { params: { user: userType } }) {
  return (
    <CheckAccountLayout user={params.user}>
      <Layout>
        <div className={styles.container_header}>
          <Header user={params.user} />
        </div>
      </Layout>
    </CheckAccountLayout>
  );
}
