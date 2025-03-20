"use client";
import { useMutation } from "@tanstack/react-query";
import { EmailTemplateFormValues } from "@/schemas/email-templates";
import { api } from "@/lib/axios";
import TemplateForm from "../template-form";
import { useToast } from "@email-scheduler/ui";
import { apiEndpoints, appRoutes } from "@/config";
import { useRouter } from "next/navigation";

export default function AddTemplate() {
  const { toast } = useToast();
  const router = useRouter();
  const postMutation = useMutation({
    mutationFn: async (values: EmailTemplateFormValues) => {
      const res = await api.post(apiEndpoints.templates.post, values);
      return res.data;
    },
  });
  const handleSubmit = (values: EmailTemplateFormValues) => {
    postMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Template Created",
        });
        router.push(appRoutes.templates.list);
      },
    });
  };
  return (
    <TemplateForm loading={postMutation.isPending} onSubmit={handleSubmit} />
  );
}
