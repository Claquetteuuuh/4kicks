import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/SessionProvider/SessionProvider";
import "./globals.css";
import { getCurrentUser } from "../lib/getCurrentUser";
import { userType } from "../../types/global/UserType";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4kicks store",
  description:
    "4Kicks - Votre destination ultime pour des chaussures de marque en France ! Découvrez notre vaste collection, offrant les derniers modèles de Nike, Adidas, Puma et bien d'autres. Que vous cherchiez des baskets élégantes, des chaussures de sport performantes ou des éditions limitées, 4Kicks a tout ce qu'il vous faut. Profitez de nos offres exclusives, de notre garantie de qualité et d'une expédition rapide partout en France. Visitez 4Kicks aujourd'hui et marchez avec style !",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    user: userType;
  };
}) {
  const user = await getCurrentUser();

  if (user) {
    params.user = user;
  }
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true} className={inter.className}>
        <SessionProvider>
          <Navbar user={params.user} />
          {children}
          <Footer />
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
