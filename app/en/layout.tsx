import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corneal Dystrophy Log",
  description:
    "A public corneal dystrophy knowledge base, clinician map, post-transplant care reference, and private local log tool.",
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
