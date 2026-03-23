# Changelog

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
