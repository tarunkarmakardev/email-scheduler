import { Auth } from "googleapis";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  password: string | null;
  googleToken: Auth.Credentials | null;
};
