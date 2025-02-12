import { apiEndpoints } from "@/config";
import CampaignCard from "@/features/campaign-card";
import QueryContainer from "@/features/query-container";
import { CampaignGetData } from "@/schemas/campaigns";

export default async function Page() {
  return (
    <QueryContainer<CampaignGetData> url={apiEndpoints.campaigns}>
      {(res) => (
        <div className="flex flex-col gap-4">
          {res.result.items.map((camp) => (
            <CampaignCard key={camp.id} campaign={camp} />
          ))}
        </div>
      )}
    </QueryContainer>
  );
}
