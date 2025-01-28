import { query } from "@/lib/query";
import { GoogleAuthResponse } from "@/schemas/google";

export default async function Page() {
  const {
    res: { authUrl },
  } = await query<GoogleAuthResponse>("/api/auth/google");
  return (
    <div>
      <a href={authUrl} className="underline text-blue-400">
        Sign in With Google
      </a>
    </div>
  );
}
