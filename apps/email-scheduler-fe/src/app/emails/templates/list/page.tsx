import TemplateCard from "@/features/template-card";
import { query } from "@/lib/query";
import { EmailTemplateGetData } from "@/schemas/email-templates";

export default async function Page() {
  const { res } = await query<EmailTemplateGetData>("/api/emails/templates");
  if (!res) return <div>Error</div>;
  const { results } = res;
  return (
    <div className="flex flex-col gap-4">
      {results.map((r) => (
        <TemplateCard
          key={r.id}
          id={r.id}
          name={r.name}
          subject={r.subject}
          body={r.body}
        />
      ))}
    </div>
  );
}
export const dynamic = "force-dynamic";
