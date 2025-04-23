import { Customer } from "@/schemas/customers";
import { Badge } from "@email-scheduler/ui";

type CustomerListItem = Pick<Customer, "email">;

export default function CustomersList({
  customers,
}: {
  customers: CustomerListItem[];
}) {
  const renderContent = () => {
    if (!customers) return <div className="text-sm">No recipients</div>;
    return customers.map((customer) => (
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
