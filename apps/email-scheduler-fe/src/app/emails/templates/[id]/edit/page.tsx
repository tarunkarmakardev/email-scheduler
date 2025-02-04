import EditTemplate from "@/features/edit-template";
import { query } from "@/lib/query";
import { EmailTemplateDetailData } from "@/schemas/email-templates";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { res } = await query<EmailTemplateDetailData>(
    `/api/emails/templates/${id}`
  );
  if (!res) return <div>Error</div>;
  return (
    <div>
      <EditTemplate template={res} />
    </div>
  );
}

export const dynamic = "force-dynamic";
