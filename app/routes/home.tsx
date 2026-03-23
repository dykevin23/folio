import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Folio" },
    { name: "description", content: "개인 자산 관리 & 부동산 트래킹" },
  ];
}

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Folio</h1>
    </div>
  );
}
