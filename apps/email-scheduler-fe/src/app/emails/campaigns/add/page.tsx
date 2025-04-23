"use client";
import { apiEndpoints, appRoutes } from "@/config";
import CampaignForm from "@/features/campaign-form";
import { api } from "@/lib/axios";
import { CampaignFormValues } from "@/schemas/campaigns";
import { useToast } from "@email-scheduler/ui";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const postApi = useMutation({
    mutationFn: (values: CampaignFormValues) => {
      return api.post(apiEndpoints.campaigns.post, values);
    },
  });
  return (
    <CampaignForm
      loading={postApi.isPending}
      onSubmit={(values) => {
        postApi.mutate(values, {
          onSuccess: () => {
            toast({
              title: "Campaign Created",
            });
            router.push(appRoutes.campaigns.list);
          },
        });
      }}
    />
  );
}
