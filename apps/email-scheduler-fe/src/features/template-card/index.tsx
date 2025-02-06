import EmailBodyPreview from "../email-body-preview";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@email-scheduler/ui";
import { EditTemplateButton } from "../edit-template";
import { DeleteTemplateButton } from "../delete-template";
import SendEmailButton from "../send-email-button";

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
        <SendEmailButton id={id} />
        <EditTemplateButton id={id} />
        <DeleteTemplateButton id={id} />
      </CardFooter>
    </Card>
  );
}
