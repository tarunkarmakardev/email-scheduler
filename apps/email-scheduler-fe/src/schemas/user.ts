import { Auth } from "googleapis";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  picture: z.string().url(),
  password: z.string().optional(),
  googleToken: z.custom<Auth.Credentials>().optional(),
});
