"use client";
import { useToast } from "@email-scheduler/ui";
import CampaignForm from "../campaign-form";
import { useMutation } from "@tanstack/react-query";
import { Campaign, CampaignFormValues } from "@/schemas/campaigns";
import { apiEndpoints } from "@/config";
import { api } from "@/lib/axios";

type EditCampaignProps = {
  campaign: Campaign;
};

export default function EditCampaign({ campaign }: EditCampaignProps) {
  const { toast } = useToast();
  const postApi = useMutation({
    mutationFn: (values: CampaignFormValues) => {
      return api.patch(apiEndpoints.campaigns.patch(campaign.id), values);
    },
  });
  return (
    <CampaignForm
      values={campaign}
      submitButtonText="Update"
      loading={postApi.isPending}
      onSubmit={(values) => {
        postApi.mutate(values, {
          onSuccess: () => {
            toast({
              title: "Campaign Updated",
            });
          },
        });
      }}
    />
  );
}
