"use client";
import {
  CampaignFormValues,
  CampaignFormValuesSchema,
} from "@/schemas/campaigns";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@email-scheduler/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CopyPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Control,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

const defaultValues: CampaignFormValues = {
  name: "",
  customers: [
    {
      email: "",
      firstName: "",
      lastName: "",
      variables: {},
    },
  ],
  variables: [],
};

type CampaignFormProps = {
  values?: CampaignFormValues;
  submitButtonText?: string;
  loading?: boolean;
  onSubmit: (data: CampaignFormValues) => void;
};

export default function CampaignForm({
  values,
  onSubmit,
  submitButtonText = "Submit",
  loading,
}: CampaignFormProps) {
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(CampaignFormValuesSchema),
    defaultValues,
    values,
    mode: "all",
  });

  console.log(form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customers</FormLabel>
              <FormControl>
                <EmailsTable control={form.control} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading && <Loader2 className="animate-spin" />}
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}

type EmailsTableProps = {
  control: Control<CampaignFormValues>;
};

function EmailsTable({ control }: EmailsTableProps) {
  const { field: variablesField } = useController({
    control,
    name: "variables",
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "customers",
  });
  const renderInput = (
    idx: number,
    path: "firstName" | "lastName" | "email",
    placeholder: string
  ) => {
    return (
      <FormField
        control={control}
        name={`customers.${idx}.${path}`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <div>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    );
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Email Address</TableHead>
            <TableHead className="w-[200px]">First Name</TableHead>
            <TableHead className="w-[200px]">Last Name</TableHead>
            {variablesField.value?.map((variable) => (
              <TableHead className="w-[200px]" key={variable}>
                {variable}
              </TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((customer, idx) => (
            <TableRow key={customer.id}>
              <TableCell className="align-top">
                {renderInput(idx, "email", "Email")}
              </TableCell>
              <TableCell className="align-top">
                {renderInput(idx, "firstName", "First Name")}
              </TableCell>
              <TableCell className="align-top">
                {renderInput(idx, "lastName", "Last Name")}
              </TableCell>
              {variablesField.value?.map((variable) => (
                <TableCell key={variable} className="align-top">
                  <FormField
                    control={control}
                    name={`customers.${idx}.variables.${variable}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={variable} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              ))}
              <TableCell className="align-top">
                <div className="flex items-center justify-end gap-2">
                  <div onClick={() => remove(idx)}>Remove</div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-2">
        <AddColumn />
        <Button
          variant="outline"
          onClick={() => append(defaultValues.customers[0])}
        >
          Add Customer
        </Button>
      </div>
    </>
  );
}

function AddColumn() {
  const [colName, setColName] = useState("");
  const form = useFormContext<CampaignFormValues>();
  const handleSubmit = () => {
    const values = form.getValues();
    form.setValue("variables", [...(values.variables || []), colName]);
    form.setValue(
      "customers",
      values.customers.map((c) => ({
        ...c,
        variables: {
          ...c.variables,
          [colName]: "",
        },
      }))
    );
  };
  return (
    <Popover>
      <PopoverTrigger>
        <CopyPlus />
      </PopoverTrigger>
      <PopoverContent>
        <Input
          placeholder="Column Name"
          value={colName}
          onChange={(e) => setColName(e.target.value)}
          className="mb-4"
        />
        <Button variant="outline" onClick={handleSubmit}>
          Add Column
        </Button>
      </PopoverContent>
    </Popover>
  );
}
