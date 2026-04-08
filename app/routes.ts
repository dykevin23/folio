import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // 루트 접속 시 디바이스 감지 후 리다이렉트
  index("routes/home.tsx"),

  // PC 라우트
  layout("routes/desktop/layout.tsx", [
    route("desktop", "routes/desktop/home.tsx"),
    route("desktop/realestate", "routes/desktop/realestate.tsx"),
    route("desktop/assets", "routes/desktop/assets.tsx"),
    route("desktop/settings", "routes/desktop/settings.tsx"),
  ]),

  // 모바일 라우트 (추후)
  layout("routes/mobile/layout.tsx", [
    route("mobile", "routes/mobile/home.tsx"),
    route("mobile/realestate", "routes/mobile/realestate.tsx"),
  ]),
] satisfies RouteConfig;
