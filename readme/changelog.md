# Changelog

## 2026-04-08

### PC 레이아웃 및 라우팅 구축
- 디바이스 감지 리다이렉트 구현 (`/` → User-Agent 기반 `/desktop` 또는 `/mobile` 분기)
- `routes.ts` 전체 라우트 구조 설정 (desktop/mobile layout 분리)
- PC GNB 레이아웃 — 상단 네비게이션 (Folio 로고 + 홈/부동산/자산/설정)
- 모바일 하단 탭 바 레이아웃 껍데기
- PC 페이지 껍데기 4개 (홈, 부동산, 자산, 설정)
- 모바일 페이지 껍데기 2개 (홈, 부동산)

### 문서 정리
- `folio_plan.md` 추가 — 전체 기획 문서 (목적, Feature, 모바일/PC 화면 설계)
- 기존 개별 문서 삭제 (01_overview.md, property.md, todo.md, assets.md, settings.md) → folio_plan.md로 대체
- `README.md` 문서 목록 갱신
- `02_system_design.md` 기술 스택에 Drizzle ORM 추가
- `05_dev_roadmap.md` PC 우선 개발 순서로 로드맵 재정리

---

## 2026-04-01

### Drizzle ORM 도입 및 DB 마이그레이션
- drizzle-orm, drizzle-kit, postgres 드라이버 설치
- `drizzle.config.ts` 생성 (스키마 경로: `app/features/**/schema.ts`)
- `app/features/realestate/schema.ts` — 5개 테이블 스키마 정의 (regions, zones, complexes, complex_types, price_histories)
- Supabase DB 마이그레이션 실행 완료
- package.json에 `db:generate`, `db:migrate`, `db:studio` 스크립트 추가

### Supabase 연결
- `.env`에 DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY 설정
- DB 연결 확인 완료

### 문서 및 네이밍 정리
- feature 폴더명 `property` → `realestate`로 변경
- `02_system_design.md` 디렉토리 구조 내 property → realestate 반영
- `.claude/commands/db-sync.md` Drizzle 기준으로 업데이트

---

## 2026-03-23

### 프로젝트 초기 세팅
- `create-react-router`로 프로젝트 생성 (React Router v7 + React 19 + Tailwind v4 + TypeScript)
- pnpm 패키지 매니저 도입
- 불필요 파일 제거 (Dockerfile, .dockerignore, welcome 샘플)
- `root.tsx` lang="ko" 변경

### shadcn-ui + Supabase 설치
- shadcn-ui 초기화 (base-nova 스타일, lucide 아이콘)
- shadcn 경로를 `app/common/components/ui/`로 변경 (components.json alias 수정)
- @supabase/supabase-js 설치, `app/lib/supabase.ts` 클라이언트 생성
- `.env.example` 추가

### 디렉토리 구조 구성
- feature 기반 구조 채택 (모바일/PC 분리는 feature 내부에서 처리)
- 폴더 생성: common, features, hooks, assets, sql (functions/views/triggers/migrations)

### 프로젝트 문서
- `readme/` 기획 문서 추가 (개요, 시스템설계, DB스키마, 로드맵, 기능별 상세)
- `02_system_design.md` 디렉토리 구조 및 기술 스택 업데이트 (Remix → React Router v7)
