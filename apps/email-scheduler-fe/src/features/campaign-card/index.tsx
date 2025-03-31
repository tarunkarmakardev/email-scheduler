import { appRoutes } from "@/config";
import { Campaign } from "@/schemas/campaigns";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@email-scheduler/ui";
import Link from "next/link";
import DeleteCampaign from "../delete-campaign";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{campaign.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        {campaign.customers.map((cust) => (
          <Badge className="bg-secondary" key={cust.email}>
            {cust.email}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={appRoutes.campaigns.edit(campaign.id)}>
          <Button variant="outline">Edit</Button>
        </Link>
        <DeleteCampaign id={campaign.id} />
      </CardFooter>
    </Card>
  );
}
