"use client";
import { apiEndpoints } from "@/config";
import { api } from "@/lib/axios";
import { Button, useToast } from "@email-scheduler/ui";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteCampaign({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const deleteApi = useMutation({
    mutationFn: () => api.delete(apiEndpoints.campaigns.delete(id)),
  });
  const handleDelete = () => {
    deleteApi.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Campaign deleted",
        });
        router.refresh();
      },
    });
  };
  const loading = deleteApi.isPending;
  return (
    <div>
      <Button variant="destructive" onClick={handleDelete}>
        {loading && <Loader2 className="animate-spin" />}Delete
      </Button>
    </div>
  );
}
