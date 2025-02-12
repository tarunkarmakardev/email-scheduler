import { apiEndpoints } from "@/config";
import QueryContainer from "@/features/query-container";
import SendEmail from "@/features/send-email";
import { EmailTemplateDetailData } from "@/schemas/email-templates";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <QueryContainer<EmailTemplateDetailData>
      url={apiEndpoints.templateDetail(id)}
      options={{
        pathParams: { id },
      }}
    >
      {(res) => <SendEmail template={res.result} />}
    </QueryContainer>
  );
}
