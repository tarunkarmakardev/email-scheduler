"use client";
import { apiEndpoints } from "@/config";
import { CampaignGetData } from "@/schemas/campaigns";
import { EmailTemplateDetailData } from "@/schemas/email-templates";
import {
  Badge,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@email-scheduler/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import EmailBodyEditor from "../email-body-editor";
import { api } from "@/lib/axios";
import { CustomerGetData } from "@/schemas/customers";
import { Mail } from "lucide-react";

type SendEmailProps = {
  template: EmailTemplateDetailData;
};
type SendEmailFormValues = {
  campaignId: string;
  subject: string;
  body: string;
};

export default function SendEmail({ template }: SendEmailProps) {
  const form = useForm<SendEmailFormValues>({
    defaultValues: {
      subject: "",
      body: "",
      campaignId: "",
    },
    values: {
      campaignId: "",
      body: template.body,
      subject: template.subject,
    },
  });
  const campaignsQuery = useQuery({
    queryKey: [apiEndpoints.campaigns],
    queryFn: async () => {
      const res = await api.get(apiEndpoints.campaigns);
      return res.data as CampaignGetData;
    },
  });
  const customersMutation = useMutation({
    mutationFn: async (payload: { campaignId: string }) => {
      const res = await api.get(apiEndpoints.customers, {
        params: payload,
      });
      return res.data as CustomerGetData;
    },
  });
  const { items: campaigns = [] } = campaignsQuery.data || {};

  return (
    <div className="w-[500px] py-4">
      <h1 className="capitalize mb-6">Template: {template.name}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            console.log(values);
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="campaignId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    customersMutation.mutate({
                      campaignId: value,
                    });
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Campaign" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {campaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Populate recipients by selecting a campaign{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Recipients</FormLabel>
            <CustomersList data={customersMutation.data} />
          </FormItem>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <EmailBodyEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.formState.isValid}>
            <Mail />
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}

function CustomersList({ data }: { data?: CustomerGetData }) {
  const renderContent = () => {
    if (!data) return <div className="text-sm">No recipients</div>;
    return data.items.map((customer) => (
      <Badge key={customer.id} variant="secondary" className=" h-6 py-0">
        {customer.email}
      </Badge>
    ));
  };
  return (
    <div className="flex items-center gap-2 flex-wrap max-h-32 overflow-auto">
      {renderContent()}
    </div>
  );
}
