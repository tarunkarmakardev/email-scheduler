"use client";

import { useMutation } from "@tanstack/react-query";
import CampaignForm from "../campaign-form";
import { Campaign, CampaignFormValues } from "@/schemas/campaigns";
import { api } from "@/lib/axios";
import { apiEndpoints } from "@/config";

export default function EditCampaign({ campaign }: { campaign: Campaign }) {
  const patchApi = useMutation({
    mutationFn: async (values: CampaignFormValues) => {
      await api.patch(apiEndpoints.campaigns.patch(campaign.id), values);
    },
  });
  return (
    <CampaignForm
      values={campaign}
      onSubmit={(values) => {
        patchApi.mutate(values);
      }}
      submitButtonText="Update"
      loading={patchApi.isPending}
    />
  );
}
