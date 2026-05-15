import DashboardContent from "@/components/dashboard-content";
import { getDashboardStats } from "@/lib/data";

export default function EnglishHomePage() {
  return <DashboardContent stats={getDashboardStats()} lang="en" />;
}
