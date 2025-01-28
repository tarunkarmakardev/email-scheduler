export type Env = {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
};
export function getEnv() {
  return process.env as unknown as Env;
}
