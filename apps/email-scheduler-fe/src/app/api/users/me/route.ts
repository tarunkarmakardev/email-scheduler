import { db } from "@/lib/db";
import { ApiResponse, createRouteHandler } from "@/lib/route-handler";
import {
  UserDetailData,
  UserDetailDataSchema,
  UserDetailPayload,
} from "@/schemas/user";

export const GET = createRouteHandler<UserDetailPayload, UserDetailData>(
  async ({ request, userId }) => {
    const currentUser = await db().user.findUnique({
      where: {
        id: userId,
      },
    });
    return new ApiResponse(UserDetailDataSchema.parse(currentUser));
  }
);
