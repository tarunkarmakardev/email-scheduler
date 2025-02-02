import { query } from "@/lib/query";
import { GoogleAuthResponse } from "@/schemas/google";

export default async function Page() {
  const { res } = await query<GoogleAuthResponse>("/api/auth/google");
  if (!res) return <div>Error</div>;
  return (
    <div>
      <a href={res.authUrl} className="underline text-blue-400">
        Sign in With Google
      </a>
    </div>
  );
}
