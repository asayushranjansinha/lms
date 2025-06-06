import { delay } from "@/constants/mock-api";
import { BarGraph } from "@/features/admin-dashboard/overview/bar-graph";


export default async function BarStats() {
  await await delay(1000);

  return <BarGraph />;
}
