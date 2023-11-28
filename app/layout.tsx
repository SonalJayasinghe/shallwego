import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "./api/auth/provider";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shall we go",
  description: "Would you like to go with me to the Social?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Theme accentColor="crimson" radius="full">
            <div>
              <Navbar />
            </div>

            <main className="p-10 bg-slate-50 min-h-screen pt-[100px] grid grid-cols-12">
              <div className=" col-span-12">{children}</div>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
