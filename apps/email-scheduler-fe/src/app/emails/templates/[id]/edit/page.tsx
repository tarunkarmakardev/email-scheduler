import { apiEndpoints } from "@/config";
import EditTemplate from "@/features/edit-template";
import QueryContainer from "@/features/query-container";
import { EmailTemplateDetailData } from "@/schemas/email-templates";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <QueryContainer<EmailTemplateDetailData>
      url={apiEndpoints.templateDetail}
      options={{
        pathParams: { id },
      }}
    >
      {(res) => <EditTemplate template={res.data} />}
    </QueryContainer>
  );
}

export const dynamic = "force-dynamic";
