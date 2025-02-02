import Link from "next/link";
import EmailBodyPreview from "../email-body-preview";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@email-scheduler/ui";

type TemplateCardProps = {
  id: string;
  name: string;
  subject: string;
  body: string;
};

export default function TemplateCard({
  id,
  body,
  name,
  subject,
}: TemplateCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl capitalize">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <p className="font-semibold">Subject:</p>
          <p>{subject}</p>
        </div>
        <p className="h-[140px]">
          <EmailBodyPreview content={body} />
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <EditTemplate id={id} />
        <DeleteTemplate />
      </CardFooter>
    </Card>
  );
}

function EditTemplate({ id }: { id: string }) {
  return (
    <div>
      <Link href={`/emails/templates/edit/${id}`}>
        <Button>Edit</Button>
      </Link>
    </div>
  );
}

function DeleteTemplate() {
  return (
    <div>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
