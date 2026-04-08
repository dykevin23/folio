import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Folio — 설정" }];
}

export default function DesktopSettings() {
  return (
    <div>
      <h1 className="text-2xl font-bold">설정</h1>
      <p className="mt-2 text-muted-foreground">준비 중입니다.</p>
    </div>
  );
}
