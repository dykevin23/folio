# 5. 개발 로드맵

## 단계별 계획

| 단계 | 작업 | 비고 |
|------|------|------|
| 1단계 | 프로젝트 초기 셋업 | Remix + Supabase + TailwindCSS + shadcn-ui + Vercel + PWA |
| 2단계 | DB 마이그레이션 | Supabase 스키마 생성, 시/군/구/동 초기 데이터 import |
| 3단계 | 부동산 - 단지 등록/관리 (모바일) | 지역 / 생활권 / 단지 / 평형 타입 CRUD |
| 4단계 | 부동산 - 가격 입력 (모바일) | 매월 호가 / 실거래가 입력 폼 |
| 5단계 | 부동산 - 분석 화면 (PC) | 가격 추이 차트, 단지 비교 |
| 6단계 | 홈 - Todo / 일정 관리 | 기능 정의 후 진행 |
| 7단계 | 자산 현황 | 기능 정의 후 진행 |
| 8단계 | 설정 | 각 feature 구체화 후 진행 |

---

## 1단계 셋업 체크리스트

- [ ] `pnpm create remix` 프로젝트 생성
- [ ] TailwindCSS 설정
- [ ] shadcn-ui 초기 설정
- [ ] Supabase 프로젝트 생성 (dev / prod 분리)
- [ ] Supabase 클라이언트 연결 (`app/lib/supabase.ts`)
- [ ] Vercel 배포 연결
- [ ] PWA 설정 (`manifest.json`, service worker)
- [ ] 디바이스 감지 리다이렉트 (`app/routes/_index.tsx`)
- [ ] 모바일 / PC 레이아웃 기본 셸 구성
