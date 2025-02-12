import { apiEndpoints } from "@/config";
import QueryContainer from "@/features/query-container";
import { GoogleAuthGetData } from "@/schemas/google";

export default async function Page() {
  return (
    <QueryContainer<GoogleAuthGetData> url={apiEndpoints.googleAuth}>
      {(res) => (
        <a href={res.result.authUrl} className="underline text-blue-400">
          Sign in With Google
        </a>
      )}
    </QueryContainer>
  );
}
