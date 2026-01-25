import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next Tasks",
  description: "タスク管理アプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressContentEditableWarning>
      <body
        className={`${inter.className} antialiased bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
