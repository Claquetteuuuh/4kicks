"use client";
import React from "react";
import { userType } from "../../../types/global/UserType";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Layout from "@/components/Layout/Layout";
import CheckAccountLayout from "@/components/checkAccountLayout/CheckAccountLayout";

const Page = ({ params }: { params: { user: userType } }) => {
  const router = useRouter();
  return (
    <CheckAccountLayout user={params.user}>
      <Layout params={params}>
        <button onClick={(e) => signOut()}>disconnect</button>
      </Layout>
    </CheckAccountLayout>
  );
};

export default Page;
