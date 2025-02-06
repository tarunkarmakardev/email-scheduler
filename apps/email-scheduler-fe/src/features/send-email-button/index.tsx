import { Button } from "@email-scheduler/ui";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function SendEmailButton({ id }: { id: string }) {
  return (
    <Link href={`/emails/templates/${id}/send-email`}>
      <Button variant="outline">
        <Mail />
        Send Email
      </Button>
    </Link>
  );
}
