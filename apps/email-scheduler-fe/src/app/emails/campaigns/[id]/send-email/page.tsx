import { apiEndpoints } from "@/config";
import QueryContainer from "@/features/query-container";
import { CampaignDetailData } from "@/schemas/campaigns";
import { CustomerGetData } from "@/schemas/customers";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <QueryContainer<CampaignDetailData>
        url={apiEndpoints.campaignDetail}
        options={{
          pathParams: { id },
        }}
      >
        {(res) => <div>{res.data.name}</div>}
      </QueryContainer>
      <QueryContainer<CustomerGetData>
        url={apiEndpoints.customers}
        options={{
          searchParams: { campaignId: id },
        }}
      >
        {(res) => (
          <div>
            {res.data.results.map((customer) => (
              <div key={customer.id}>{customer.firstName}</div>
            ))}
          </div>
        )}
      </QueryContainer>
    </div>
  );
}
