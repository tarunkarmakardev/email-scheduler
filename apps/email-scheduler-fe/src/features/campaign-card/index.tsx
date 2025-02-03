import { Campaign } from "@/schemas/campaigns";
import { Button, Card, CardHeader, CardTitle } from "@email-scheduler/ui";
import { Mail } from "lucide-react";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{campaign.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">Edit</Button>
            <Button variant="destructive">Delete</Button>
            <Button variant="outline">View Recipients</Button>
            <Button>
              <Mail /> Send Email
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
