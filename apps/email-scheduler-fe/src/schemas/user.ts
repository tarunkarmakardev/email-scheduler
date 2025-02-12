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

export const UserDetailPayloadSchema = UserSchema.pick({ id: true });
export const UserDetailDataSchema = UserSchema.omit({
  googleToken: true,
  password: true,
});
export type UserDetailPayload = z.infer<typeof UserDetailPayloadSchema>;
export type UserDetailData = z.infer<typeof UserDetailDataSchema>;
