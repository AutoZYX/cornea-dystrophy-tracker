import HomeDashboard from "./home-dashboard";
import type { DashboardStats } from "@/lib/types";

export default function DashboardContent({ stats }: { stats: DashboardStats }) {
  return <HomeDashboard stats={stats} />;
}
