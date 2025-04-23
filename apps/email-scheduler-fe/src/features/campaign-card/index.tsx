import { appRoutes } from "@/config";
import { Campaign } from "@/schemas/campaigns";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@email-scheduler/ui";
import Link from "next/link";
import DeleteCampaign from "../delete-campaign";
import CustomersList from "../customer-list";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{campaign.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CustomersList customers={campaign.customers} />
      </CardContent>
      <CardFooter>
        <Link href={appRoutes.campaigns.edit(campaign.id)}>
          <Button variant="outline">Edit</Button>
        </Link>
        <DeleteCampaign id={campaign.id} />
      </CardFooter>
    </Card>
  );
}
