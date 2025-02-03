import CampaignCard from "@/features/campaign-card";
import { query } from "@/lib/query";
import { CampaignGetData } from "@/schemas/campaigns";

export default async function Page() {
  const { res } = await query<CampaignGetData>("/api/emails/campaigns");
  if (!res) return <div>Error</div>;
  return (
    <div className="flex flex-col gap-4">
      {res.results.map((camp) => (
        <CampaignCard key={camp.id} campaign={camp} />
      ))}
    </div>
  );
}
