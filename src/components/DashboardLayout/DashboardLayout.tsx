"use client";

import React, { useState, useEffect, useRef } from "react";
import { redirect, usePathname } from "next/navigation";
import styles from "./dashboard_layout.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession({required: true, onUnauthenticated() {
    redirect("/api/auth/signin");
  }})
  const pathname = usePathname();
  const [route, setRoute] = useState<string | null | undefined>(
    pathname?.split("/")[2]
  );

  useEffect(() => {
    setRoute(pathname?.split("/")[2]);
  }, [pathname]);
  return (
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
              Dashboard
            </li>
          </Link>
          <Link href={"/dashboard/formations"}>
            <li className={route == "formations" ? styles.selected : undefined}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0116 16v288a16 16 0 01-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0116-16c131.57.59 192 32.84 208 96zM256 160v288"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>
              Formations
            </li>
          </Link>
          <Link href="/dashboard/projects">
            <li className={route == "projects" ? styles.selected : undefined}>
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
                  strokeWidth="32"
                  d="M160 368L32 256l128-112M352 368l128-112-128-112"
                />
              </svg>
              Projects
            </li>
          </Link>
          <Link href={"/dashboard/contacts"}>
            <li className={route == "contacts" ? styles.selected : undefined}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
              >
                <rect
                  x="48"
                  y="96"
                  width="416"
                  height="320"
                  rx="40"
                  ry="40"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M112 160l144 112 144-112"
                />
              </svg>
              Contacts
            </li>
          </Link>
          <Link href={"/dashboard/technos"}>
            <li className={route == "technos" ? styles.selected : undefined}>
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
                  strokeWidth="32"
                  d="M48 112h288M192 64v48M272 448l96-224 96 224M301.5 384h133M281.3 112S257 206 199 277 80 384 80 384"
                />
                <path
                  d="M256 336s-35-27-72-75-56-85-56-85"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>
              Technos
            </li>
          </Link>
        </ul>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
