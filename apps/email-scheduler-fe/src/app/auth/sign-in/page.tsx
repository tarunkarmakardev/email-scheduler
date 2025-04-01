import { apiEndpoints } from "@/config";
import BrandLogo from "@/features/brand-logo";
import QueryContainer from "@/features/query-container";
import { GoogleAuthGetData } from "@/schemas/google";
import { Button } from "@email-scheduler/ui";

export default async function Page() {
  return (
    <QueryContainer<GoogleAuthGetData> url={apiEndpoints.googleAuth}>
      {(res) => (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
          <BrandLogo className="flex-grow-0 text-5xl" />
          <a href={res.result.authUrl}>
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                className="h-4 w-4 text-white"
              >
                <path
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  fill="currentColor"
                />
              </svg>
              Sign in With Google
            </Button>
          </a>
        </div>
      )}
    </QueryContainer>
  );
}
