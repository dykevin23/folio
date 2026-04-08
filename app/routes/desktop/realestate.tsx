import type { Route } from "./+types/realestate";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Folio — 부동산" }];
}

export default function DesktopRealestate() {
  return (
    <div>
      <h1 className="text-2xl font-bold">부동산 트래킹</h1>
      <p className="mt-2 text-muted-foreground">준비 중입니다.</p>
    </div>
  );
}
