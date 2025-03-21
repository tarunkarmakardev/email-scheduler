import { z } from "zod";

export const ServerEnvSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  DOMAIN: z.string(),
  SECRET: z.string(),
});

export const ClientEnvSchema = z.object({});

export type ServerEnv = z.infer<typeof ServerEnvSchema>;

export type ClientEnv = z.infer<typeof ClientEnvSchema>;

export function getEnv(): ServerEnv {
  const env = ServerEnvSchema.parse(process.env);
  return env;
}

export function getClientEnv(): ClientEnv {
  const env = ClientEnvSchema.parse(process.env);
  return env;
}
