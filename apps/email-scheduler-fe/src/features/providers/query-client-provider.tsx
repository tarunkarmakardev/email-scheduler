import { useToast } from "@email-scheduler/ui";
import {
  QueryClient,
  QueryClientProvider as BaseQueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { useState } from "react";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (e) => {
            toast({
              variant: "destructive",
              title: "Error",
              description: e.message,
            });
          },
        }),
        defaultOptions: {
          mutations: {
            onError: (e) => {
              toast({
                variant: "destructive",
                title: "Error",
                description: e.message,
              });
            },
          },
        },
      })
  );

  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
    </BaseQueryClientProvider>
  );
}
