import React, { FC } from "react";
import Navbar from "../Navbar/Navbar";
import { userType } from "../../../types/global/UserType";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: userType };
}) {
  return (
    <div>
      <Navbar user={params.user} />
      {children}
    </div>
  );
}
