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
  const templateDeleteMutation = useMutation({
    mutationFn: () => api.delete(apiEndpoints.campaigns.delete(id)),
  });
  const handleDelete = () => {
    templateDeleteMutation.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Template deleted",
        });
        router.refresh();
      },
    });
  };
  const loading = templateDeleteMutation.isPending;
  return (
    <div>
      <Button variant="destructive" disabled={loading} onClick={handleDelete}>
        {loading && <Loader2 className="animate-spin" />}
        Delete
      </Button>
    </div>
  );
}
