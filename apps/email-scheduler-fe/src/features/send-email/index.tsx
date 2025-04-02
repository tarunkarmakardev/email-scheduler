"use client";
import { apiEndpoints } from "@/config";
import { Campaign, CampaignGetData } from "@/schemas/campaigns";
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
import { Mail } from "lucide-react";
import { ApiSuccessResponse } from "@/schemas/api";
import { SendEmailFormValues } from "@/schemas/send-email";

type SendEmailProps = {
  template: EmailTemplateDetailData;
};

export default function SendEmail({ template }: SendEmailProps) {
  const postApi = useMutation({
    mutationFn: async (data: SendEmailFormValues) => {
      const res = await api.post(apiEndpoints.sendEmail, data);
      return res.data;
    },
  });

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
      const res = await api.get(apiEndpoints.campaigns.get);
      return res.data as ApiSuccessResponse<CampaignGetData>;
    },
  });
  const { items: campaigns = [] } = campaignsQuery.data?.result || {};

  return (
    <div className="w-[500px] py-4">
      <h1 className="capitalize mb-6">Template: {template.name}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            postApi.mutate(values, {
              onSuccess: (data) => {
                console.log(data);
              },
            });
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="campaignId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
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
          <FormField
            control={form.control}
            name="campaignId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipients</FormLabel>
                <CustomersList
                  data={campaigns.find((c) => c.id === field.value)?.customers}
                />
              </FormItem>
            )}
          />
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

function CustomersList({ data }: { data?: Campaign["customers"] }) {
  const renderContent = () => {
    if (!data)
      return (
        <div className="text-xs text-muted-foreground">
          No recipients (Select a campaign)
        </div>
      );
    return data.map((customer) => (
      <Badge key={customer.email} variant="secondary" className=" h-6 py-0">
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
