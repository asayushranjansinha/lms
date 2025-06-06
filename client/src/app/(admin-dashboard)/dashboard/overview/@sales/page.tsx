import { delay } from "@/constants/mock-api";
import { RecentSales } from "@/features/admin-dashboard/overview/recent-sales";


export default async function Sales() {
  await delay(3000);
  return <RecentSales />;
}
