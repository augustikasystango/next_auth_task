import type { Metadata } from "next";
import MainHeaderLayout from "@/components/main-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next-Auth😈 ",
  description: "created by Augustika",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainHeaderLayout />
        {children}
      </body>
    </html>
  );
}
