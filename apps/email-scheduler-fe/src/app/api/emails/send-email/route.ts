import { db } from "@/lib/db";
import { getGoogleAuthClient, sendGmailEmail } from "@/lib/google";
import { ApiError, ApiResponse, createRouteHandler } from "@/lib/route-handler";
import {
  SendEmailPostPayload as PostPayload,
  SendEmailPostData as PostData,
} from "@/schemas/send-email";

export const POST = createRouteHandler<PostPayload, PostData>(
  async ({ payload, request, userId }) => {
    const campaign = await db().campaign.findUnique({
      where: {
        id: payload.campaignId,
      },
      include: {
        customers: true,
      },
    });
    if (!campaign) throw new ApiError("Campaign not found", 404);
    const emails = campaign.customers.map((customer) => {
      let body = payload.body;
      body = updateBodyVariable(body, "First Name", customer.firstName);
      body = updateBodyVariable(body, "Last Name", customer.lastName);
      Object.entries(customer.variables || {}).forEach(([key, value]) => {
        body = updateBodyVariable(body, key, value);
      });
      return {
        to: customer.email,
        subject: payload.subject,
        body,
      };
    });
    const client = await getGoogleAuthClient(userId);
    emails.forEach((email) => sendGmailEmail({ client, ...email }));

    return new ApiResponse({
      campaignId: "",
      subject: "",
      body: "",
      id: "",
      createdAt: "",
      updatedAt: "",
    });
  }
);

function updateBodyVariable(body: string, variable: string, value: string) {
  return body.replaceAll(new RegExp(`{{ ${variable} }}`, "g"), value);
}
