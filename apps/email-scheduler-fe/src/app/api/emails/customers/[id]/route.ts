import { db } from "@/lib/db";
import { ApiError, ApiResponse, createRouteHandler } from "@/lib/route-handler";
import {
  CustomerDetailPayload as DetailPayload,
  CustomerDetailData as DetailData,
  CustomerUpdatePayload as PatchPayload,
  CustomerUpdateData as PatchData,
  CustomerDeletePayload as DeletePayload,
  CustomerDeleteData as DeleteData,
  CustomerUpdatePayloadSchema as PatchPayloadSchema,
} from "@/schemas/customers";

export const GET = createRouteHandler<DetailPayload, DetailData>(
  async ({ payload }) => {
    const { id } = payload;
    const customer = await db().customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new ApiError("Customer not found", 404);
    }
    return new ApiResponse(customer);
  }
);

export const PATCH = createRouteHandler<PatchPayload, PatchData>(
  async ({ payload }) => {
    const { id, ...data } = PatchPayloadSchema.parse(payload);
    const customer = await db().customer.update({
      where: { id },
      data,
    });
    return new ApiResponse(customer);
  }
);

export const DELETE = createRouteHandler<DeletePayload, DeleteData>(
  async ({ payload }) => {
    const { id } = payload;
    const customer = await db().customer.delete({
      where: { id },
    });
    return new ApiResponse(customer);
  }
);
