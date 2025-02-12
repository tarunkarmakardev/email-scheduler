export type ApiErrorResponse = {
  status: "ERROR";
  statusCode: number;
  error: string;
};
export type ApiSuccessResponse<T> = {
  status: "SUCCESS";
  statusCode: number;
  result: T;
};
export type ApiResponseJson<T> = ApiSuccessResponse<T> | ApiErrorResponse;
