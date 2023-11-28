"use client";

import React, { useState, useEffect, useRef } from "react";
import { redirect, usePathname } from "next/navigation";
import styles from "./dashboard_layout.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import { userType } from "../../../types/global/UserType";
import { useRouter } from "next/navigation";

const DashboardLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: userType };
}) => {
  const router = useRouter();
  if (params.user.permission == "USER") {
    router.push("/");
    router.refresh();
  }
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  const pathname = usePathname();
  const [route, setRoute] = useState<string | null | undefined>(
    pathname?.split("/")[2]
  );

  useEffect(() => {
    setRoute(pathname?.split("/")[2]);
  }, [pathname]);
  return (
    <div className={styles.dashboard_container}>
      <Navbar user={params.user} />
      <div className={styles.dashboard}>
        <div className={styles.nav}>
          <ul>
            <Link href={"/dashboard"}>
              <li className={route == undefined ? styles.selected : undefined}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <rect
                    x="32"
                    y="64"
                    width="448"
                    height="320"
                    rx="32"
                    ry="32"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M304 448l-8-64h-80l-8 64h96z"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M368 448H144"
                  />
                  <path d="M32 304v48a32.09 32.09 0 0032 32h384a32.09 32.09 0 0032-32v-48zm224 64a16 16 0 1116-16 16 16 0 01-16 16z" />
                </svg>
                Stats
              </li>
            </Link>
            <Link href={"/dashboard/categories"}>
              <li
                className={route == "categories" ? styles.selected : undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="M160 144h288M160 256h288M160 368h288"
                  />
                  <circle
                    cx="80"
                    cy="144"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <circle
                    cx="80"
                    cy="256"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <circle
                    cx="80"
                    cy="368"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                </svg>
                Categories
              </li>
            </Link>
            <Link href="/dashboard/products">
              <li className={route == "products" ? styles.selected : undefined}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M68.4 192A20.38 20.38 0 0048 212.2a17.87 17.87 0 00.8 5.5L100.5 400a40.46 40.46 0 0039.1 29.5h232.8a40.88 40.88 0 0039.3-29.5l51.7-182.3.6-5.5a20.38 20.38 0 00-20.4-20.2H68.4zm193.32 160.07A42.07 42.07 0 11304 310a42.27 42.27 0 01-42.28 42.07z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M160 192l96-128 96 128"
                  />
                </svg>
                Products
              </li>
            </Link>
            <Link href={"/dashboard/accounts"}>
              <li className={route == "accounts" ? styles.selected : undefined}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <path
                    d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                  />
                  <path
                    d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <path
                    d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                  />
                </svg>
                Comptes
              </li>
            </Link>
            <Link href={"/dashboard/affiches"}>
              <li className={route == "affiches" ? styles.selected : undefined}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M368 415.86V72a24.07 24.07 0 00-24-24H72a24.07 24.07 0 00-24 24v352a40.12 40.12 0 0040 40h328"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <path
                    d="M416 464h0a48 48 0 01-48-48V128h72a24 24 0 0124 24v264a48 48 0 01-48 48z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M240 128h64M240 192h64M112 256h192M112 320h192M112 384h192"
                  />
                  <path d="M176 208h-64a16 16 0 01-16-16v-64a16 16 0 0116-16h64a16 16 0 0116 16v64a16 16 0 01-16 16z" />
                </svg>
                Affiches
              </li>
            </Link>
            <Link href={"/dashboard/avis"}>
              <li className={route == "avis" ? styles.selected : undefined}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                </svg>
                Avis
              </li>
            </Link>
            <Link href={"/dashboard/promotions"}>
              <li
                className={route == "promotions" ? styles.selected : undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M435.25 48h-122.9a14.46 14.46 0 00-10.2 4.2L56.45 297.9a28.85 28.85 0 000 40.7l117 117a28.85 28.85 0 0040.7 0L459.75 210a14.46 14.46 0 004.2-10.2v-123a28.66 28.66 0 00-28.7-28.8z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <path d="M384 160a32 32 0 1132-32 32 32 0 01-32 32z" />
                </svg>
                Code Promo
              </li>
            </Link>
          </ul>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
