import { appRoutes } from "@/config";
import { redirect, RedirectType } from "next/navigation";

export default function Page() {
  return redirect(appRoutes.auth.signIn, RedirectType.replace);
}
