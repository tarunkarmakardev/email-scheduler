import { cn } from "@email-scheduler/utils";
import { ReactComponent as Logo } from "./logo.svg";

export default function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex-1", className)}>
      <Logo />
    </div>
  );
}
