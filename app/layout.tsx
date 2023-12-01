import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "./api/auth/provider";

import { EdgeStoreProvider } from "./lib/edgestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shall we go",
  description: "Would you like to go with me to this event?",
};
``;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="crimson" radius="full">
              <div>
                <Navbar />
              </div>

              <main className="p-10 bg-slate-50 min-h-screen pt-[100px] grid grid-cols-12">
                <div className=" col-span-12">
                  <EdgeStoreProvider>{children}</EdgeStoreProvider>
                </div>
              </main>
              <Footer />
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
