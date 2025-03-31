import { apiEndpoints } from "@/config";
import EditCampaign from "@/features/edit-campaign";
import QueryContainer from "@/features/query-container";
import { CampaignDetailData } from "@/schemas/campaigns";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <QueryContainer<CampaignDetailData> url={apiEndpoints.campaigns.detail(id)}>
      {({ result: campaign }) => <EditCampaign campaign={campaign} />}
    </QueryContainer>
  );
}
