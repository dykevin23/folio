import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function loader({ request }: Route.LoaderArgs) {
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  if (isMobile) {
    throw redirect("/mobile");
  }
  throw redirect("/desktop");
}

export default function Home() {
  return null;
}
