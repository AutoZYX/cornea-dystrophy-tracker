import HomeDashboard from "./home-dashboard";
import type { DashboardStats } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

export default function DashboardContent({
  stats,
  lang = "zh",
}: {
  stats: DashboardStats;
  lang?: Locale;
}) {
  return <HomeDashboard stats={stats} lang={lang} />;
}
