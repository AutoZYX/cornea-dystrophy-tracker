import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cornea Dystrophy Log — 角膜营养不良观察手册",
  description:
    "公开角膜营养不良知识库、医院医生追踪、术后护理清单和本地私密记录工具。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${notoSerif.variable} min-h-screen flex flex-col`}>
        <Nav />
        <main className="mx-auto max-w-7xl w-full px-4 py-8 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
