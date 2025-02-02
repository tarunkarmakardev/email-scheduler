"use client";
import { useMutation } from "@tanstack/react-query";
import {
  EmailTemplateDetailData,
  EmailTemplateFormValues,
} from "@/schemas/email-templates";
import { api } from "@/lib/axios";
import TemplateForm from "../template-form";

type EditTemplateProps = {
  template: EmailTemplateDetailData;
};

export default function EditTemplate({ template }: EditTemplateProps) {
  const templatePatchMutation = useMutation({
    mutationFn: async (values: EmailTemplateFormValues) => {
      const res = await api.patch(`/emails/templates/${template.id}`, values);
      return res.data;
    },
  });
  return (
    <TemplateForm template={template} onSubmit={templatePatchMutation.mutate} />
  );
}
