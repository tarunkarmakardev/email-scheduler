"use client";
import { useMutation } from "@tanstack/react-query";
import {
  EmailTemplateDetailData,
  EmailTemplateFormValues,
} from "@/schemas/email-templates";
import { api } from "@/lib/axios";
import TemplateForm from "../template-form";
import { Button, useToast } from "@email-scheduler/ui";
import Link from "next/link";
import { apiEndpoints, appRoutes } from "@/config";
import { useRouter } from "next/navigation";

type EditTemplateProps = {
  template: EmailTemplateDetailData;
};

export default function EditTemplate({ template }: EditTemplateProps) {
  const { toast } = useToast();
  const router = useRouter();
  const templatePatchMutation = useMutation({
    mutationFn: async (values: EmailTemplateFormValues) => {
      const res = await api.patch(
        apiEndpoints.templates.patch(template.id),
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
        router.push(appRoutes.templates.list);
      },
    });
  };
  return (
    <TemplateForm
      loading={templatePatchMutation.isPending}
      template={template}
      onSubmit={handleSubmit}
      submitButtonText="Update"
    />
  );
}

export function EditTemplateButton({ id }: { id: string }) {
  return (
    <div>
      <Link href={appRoutes.templates.edit(id)}>
        <Button variant="outline">Edit</Button>
      </Link>
    </div>
  );
}
