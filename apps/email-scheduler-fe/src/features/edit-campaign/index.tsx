"use client";

import { useMutation } from "@tanstack/react-query";
import CampaignForm from "../campaign-form";
import { Campaign, CampaignFormValues } from "@/schemas/campaigns";
import { api } from "@/lib/axios";
import { apiEndpoints, appRoutes } from "@/config";
import { useRouter } from "next/navigation";
import { useToast } from "@email-scheduler/ui";

export default function EditCampaign({ campaign }: { campaign: Campaign }) {
  const router = useRouter();
  const { toast } = useToast();
  const patchApi = useMutation({
    mutationFn: async (values: CampaignFormValues) => {
      await api.patch(apiEndpoints.campaigns.patch(campaign.id), values);
    },
  });
  return (
    <CampaignForm
      values={campaign}
      onSubmit={(values) => {
        patchApi.mutate(values, {
          onSuccess: () => {
            toast({
              title: "Campaign Updated",
            });
            router.push(appRoutes.campaigns.list);
          },
        });
      }}
      submitButtonText="Update"
      loading={patchApi.isPending}
    />
  );
}
