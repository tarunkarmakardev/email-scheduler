"use client";
import { useMutation } from "@tanstack/react-query";
import {
  EmailTemplateDetailData,
  EmailTemplateFormValues,
} from "@/schemas/email-templates";
import { api } from "@/lib/axios";
import TemplateForm from "../template-form";
import { Button, useToast } from "@email-scheduler/ui";
import { useRouter } from "next/router";
import Link from "next/link";
import { apiEndpoints } from "@/config";

type EditTemplateProps = {
  template: EmailTemplateDetailData;
};

export default function EditTemplate({ template }: EditTemplateProps) {
  const { toast } = useToast();
  const router = useRouter();
  const templatePatchMutation = useMutation({
    mutationFn: async (values: EmailTemplateFormValues) => {
      const res = await api.patch(
        apiEndpoints.templateDetail(template.id),
        values
      );
      return res.data;
    },
  });
  const handleSubmit = (values: EmailTemplateFormValues) => {
    templatePatchMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Template Updated",
        });
        router.push("/emails/templates/list");
      },
    });
  };
  return (
    <TemplateForm
      loading={templatePatchMutation.isPending}
      template={template}
      onSubmit={handleSubmit}
    />
  );
}

export function EditTemplateButton({ id }: { id: string }) {
  return (
    <div>
      <Link href={`/emails/templates/edit/${id}`}>
        <Button variant="outline">Edit</Button>
      </Link>
    </div>
  );
}
