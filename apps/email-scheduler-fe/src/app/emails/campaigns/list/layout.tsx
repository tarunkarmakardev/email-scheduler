import AppLayout from "@/features/app-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppLayout title="Campaigns">{children}</AppLayout>;
}
