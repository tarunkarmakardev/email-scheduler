import { apiEndpoints } from "@/config";
import QueryContainer from "@/features/query-container";
import TemplateCard from "@/features/template-card";
import { EmailTemplateGetData } from "@/schemas/email-templates";

export default async function Page() {
  return (
    <QueryContainer<EmailTemplateGetData> url={apiEndpoints.templates}>
      {(res) => (
        <div className="flex flex-col gap-4">
          {res.result.items.map((r) => (
            <TemplateCard
              key={r.id}
              id={r.id}
              name={r.name}
              subject={r.subject}
              body={r.body}
            />
          ))}
        </div>
      )}
    </QueryContainer>
  );
}
export const dynamic = "force-dynamic";
