"use client";
import {
  EmailTemplateFormValues,
  EmailTemplateFormValuesSchema,
} from "@/schemas/email-templates";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailBodyEditor from "../email-body-editor";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@email-scheduler/ui";
import { Loader2 } from "lucide-react";

const initialValues: EmailTemplateFormValues = {
  body: "",
  name: "",
  subject: "",
};

type TemplateFormProps = {
  loading?: boolean;
  submitButtonText?: string;
  template?: EmailTemplateFormValues;
  onSubmit: (data: EmailTemplateFormValues) => void;
};
export default function TemplateForm({
  template = initialValues,
  onSubmit,
  loading,
  submitButtonText = "Submit",
}: TemplateFormProps) {
  const form = useForm({
    resolver: zodResolver(EmailTemplateFormValuesSchema),
    defaultValues: {
      body: "",
      name: "",
      subject: "",
    },
    values: {
      body: template.body,
      name: template.name,
      subject: template.subject,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Subject" {...field} />
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
                <EmailBodyEditor
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isValid || loading} type="submit">
          {loading && <Loader2 className="animate-spin" />}
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
