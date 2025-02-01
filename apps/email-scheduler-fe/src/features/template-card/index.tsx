import Link from "next/link";
import EmailBodyPreview from "../email-body-preview";

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
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold border-b border-gray-200 p-2 capitalize">
        {name}
      </h2>
      <div className="py-4 px-2">
        <div className="flex gap-2 mb-4">
          <p className="font-semibold">Subject:</p>
          <p>{subject}</p>
        </div>
        <p className="h-[200px]">
          <EmailBodyPreview content={body} />
        </p>
        <div className="flex justify-end gap-2">
          <EditTemplate id={id} />
          <DeleteTemplate />
        </div>
      </div>
    </div>
  );
}

function EditTemplate({ id }: { id: string }) {
  return (
    <div>
      <Link href={`/emails/templates/edit/${id}`}>
        <button className="bg-primary text-white px-2 py-1 rounded-sm w-28">
          Edit
        </button>
      </Link>
    </div>
  );
}

function DeleteTemplate() {
  return (
    <div>
      <button className="bg-red-600 text-white px-2 py-1 rounded-sm w-28">
        Delete
      </button>
    </div>
  );
}
