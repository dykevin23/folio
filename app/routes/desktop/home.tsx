import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Folio — 홈" },
    { name: "description", content: "개인 자산 관리 & 부동산 트래킹" },
  ];
}

export default function DesktopHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold">대시보드</h1>
      <p className="mt-2 text-muted-foreground">준비 중입니다.</p>
    </div>
  );
}
