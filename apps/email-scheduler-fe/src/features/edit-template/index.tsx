"use client";
import { useMutation } from "@tanstack/react-query";
import {
  EmailTemplateDetailData,
  EmailTemplateFormValues,
} from "@/schemas/email-templates";
import { api } from "@/lib/axios";
import TemplateForm from "../template-form";
import { useToast } from "@email-scheduler/ui";

type EditTemplateProps = {
  template: EmailTemplateDetailData;
};

export default function EditTemplate({ template }: EditTemplateProps) {
  const { toast } = useToast();
  const templatePatchMutation = useMutation({
    mutationFn: async (values: EmailTemplateFormValues) => {
      const res = await api.patch(`/emails/templates/${template.id}`, values);
      return res.data;
    },
  });
  return (
    <TemplateForm
      loading={templatePatchMutation.isPending}
      template={template}
      onSubmit={(values) =>
        templatePatchMutation.mutate(values, {
          onSuccess: () => {
            toast({
              title: "Template Updated",
            });
          },
        })
      }
    />
  );
}
