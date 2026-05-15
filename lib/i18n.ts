import type { Category } from "./types";

export type Locale = "zh" | "en";

export const CATEGORY_LABELS_EN: Record<Category, string> = {
  overview: "Overview",
  classification: "Classification",
  gene: "Genes",
  condition: "Conditions",
  diagnosis: "Diagnosis",
  treatment: "Treatment",
  care: "Care",
  institution: "Institutions",
  clinician: "Clinicians",
  research: "Research",
  glossary: "Glossary",
};

export function hrefFor(locale: Locale, href: string) {
  if (locale === "zh") return href;
  if (href === "/") return "/en";
  return `/en${href}`;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const cleanPath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return hrefFor(locale, cleanPath);
}
