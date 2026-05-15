import DashboardContent from "@/components/dashboard-content";
import { getDashboardStats } from "@/lib/data";

export default function HomePage() {
  return <DashboardContent stats={getDashboardStats()} />;
}
