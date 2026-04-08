import type { Route } from "./+types/assets";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Folio — 자산" }];
}

export default function DesktopAssets() {
  return (
    <div>
      <h1 className="text-2xl font-bold">자산 현황</h1>
      <p className="mt-2 text-muted-foreground">준비 중입니다.</p>
    </div>
  );
}
