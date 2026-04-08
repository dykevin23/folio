# 2. 시스템 설계

## 2.1 기술 스택

| 영역 | 기술 | 비고 |
|------|------|------|
| Framework | React Router v7 (Remix 후속) | 풀스택, API 서버 분리 불필요 |
| Database | Supabase (PostgreSQL) | Free tier로 개인용 충분 |
| ORM | Drizzle ORM | 스키마 코드 관리, 마이그레이션 자동화 |
| Styling | TailwindCSS v4 + shadcn-ui | |
| 배포 | Vercel | Free tier |
| 모바일 접근 | PWA | 앱스토어 없이 홈화면 추가 가능 |
| 언어 | TypeScript | |
| 패키지 매니저 | pnpm | |

---

## 2.2 모바일 / PC 분리 전략

모바일과 PC의 UX가 근본적으로 다르기 때문에 **라우트 단위로 분리**한다.

- 접속 시 User-Agent 또는 화면 너비 감지 → 자동 리다이렉트
- React Router `loader`에서 리다이렉트 처리

| 경로 | 대상 | 특징 |
|------|------|------|
| `/mobile/*` | 모바일 전용 | 입력 중심, 간결한 UI |
| `/desktop/*` | PC 전용 | 분석 / 차트 / 비교 중심 |

**공통 처리**
- 비즈니스 로직 및 Supabase 쿼리는 공유
- UI 컴포넌트와 라우트만 분리

---

## 2.3 프로젝트 디렉토리 구조

Feature 기반 구조를 채택하며, 모바일/PC 분리는 각 feature 내부에서 처리한다.
routes 폴더는 진입점 역할만 하고, 비즈니스 로직은 feature에 집중한다.

```
app/
  assets/                    ← 정적 리소스 (이미지, 폰트 등)
  common/
    components/              ← shadcn-ui + 공통 컴포넌트
    pages/                   ← 초기 페이지, 404 등
  features/
    realestate/              ← 부동산 트래킹
      components/
        mobile/              ← 모바일 전용 UI
        desktop/             ← PC 전용 UI
        shared/              ← feature 내 공유 컴포넌트
      pages/
        mobile.tsx           ← 모바일 페이지
        desktop.tsx          ← PC 페이지
      queries.ts             ← loader (데이터 조회)
      mutations.ts           ← action (데이터 변경)
      schema.ts              ← Zod 스키마 / 타입 정의
    home/
      ...같은 구조
  hooks/                     ← 커스텀 hooks
  lib/                       ← 유틸리티, Supabase 클라이언트
  sql/
    functions/               ← Supabase RPC functions
    views/                   ← Supabase views
    triggers/                ← Supabase triggers
    migrations/              ← DB 마이그레이션 SQL
  routes/                    ← 라우트 진입점 (얇게 유지)
    mobile/
      realestate.tsx           ← feature page를 import만
    desktop/
      realestate.tsx           ← feature page를 import만
  routes.ts                  ← 라우트 설정
  root.tsx
  app.css

public/
  manifest.json              ← PWA 설정

readme/                      ← 프로젝트 기획 문서
```

**routes는 얇게 유지**
```ts
// app/routes/mobile/realestate.tsx
export { default } from "~/features/realestate/pages/mobile";
export { loader } from "~/features/realestate/queries";
export { action } from "~/features/realestate/mutations";
```
