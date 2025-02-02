export type Env = {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  DOMAIN: string;
  SECRET: string;
};
export type ClientEnv = object;

export function getEnv() {
  return process.env as unknown as Env;
}

export function getClientEnv() {
  return process.env as unknown as ClientEnv;
}
