import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../../dist/css/output.css";
import "../../dist/css/style.scss";

import SingleFileUpload from '../components/singleFile'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React file upload management",
  description: "A file management system, allows for single and multiple file uploading with a preview feature",
};

app.component('SingleFileUpload', SingleFileUpload)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
