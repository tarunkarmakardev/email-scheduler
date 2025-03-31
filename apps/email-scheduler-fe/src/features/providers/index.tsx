"use client";
import { ThemeProvider } from "@email-scheduler/ui";
import QueryClientProvider from "./query-client-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
