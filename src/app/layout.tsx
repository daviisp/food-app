import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartContextProvider } from "@/context/cart";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food App",
  description:
    "Food App is a convenient platform for discovering local restaurants, exploring delicious menus, and ordering your favorite meals quickly and easily. Enjoy a seamless and user-friendly food delivery experience!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="pt-BR">
        <body className={`${inter.className} antialiased`}>
          <main className="pb-8">
            <CartContextProvider>{children}</CartContextProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
