import { apiEndpoints } from "@/config";
import QueryContainer from "@/features/query-container";
import { GoogleAuthResponse } from "@/schemas/google";

export default async function Page() {
  return (
    <QueryContainer<GoogleAuthResponse> url={apiEndpoints.googleAuth}>
      {(res) => (
        <a href={res.data.authUrl} className="underline text-blue-400">
          Sign in With Google
        </a>
      )}
    </QueryContainer>
  );
}
