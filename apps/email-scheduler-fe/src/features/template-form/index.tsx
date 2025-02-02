"use client";
import {
  EmailTemplateDetailData,
  EmailTemplateFormValues,
  EmailTemplateFormValuesSchema,
} from "@/schemas/email-templates";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailBodyEditor from "../email-body-editor";

type TemplateFormProps = {
  template: EmailTemplateDetailData;
  onSubmit: (data: EmailTemplateFormValues) => void;
};
export default function TemplateForm({
  template,
  onSubmit,
}: TemplateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block mb-2 text-sm text-slate-600">Name</label>
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
        <p>{errors.name?.message}</p>
        <label className="block mb-2 text-sm text-slate-600">Subject</label>
        <input
          {...register("subject")}
          placeholder="Subject"
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
        <p>{errors.subject?.message}</p>
        <label className="block mb-2 text-sm text-slate-600">Body</label>
        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <EmailBodyEditor value={field.value} onChange={field.onChange} />
          )}
        />
        <button
          className="bg-primary w-[100px] text-white px-2 py-1 rounded-md"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
}
