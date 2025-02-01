import { query } from "@/lib/query";
import { EmailTemplateGetData } from "@/schemas/email-templates";

export default async function Page() {
  const {
    res: { results },
  } = await query<EmailTemplateGetData>("/api/emails/templates");

  return (
    <div>
      {results.map((r) => (
        <div key={r.id}>{r.name}</div>
      ))}
    </div>
  );
}
export const dynamic = "force-dynamic";
