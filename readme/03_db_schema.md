# 3. DB 설계 (Supabase / PostgreSQL)

## 3.1 전체 계층 구조

```
regions (공통코드)  ← 행정구역 (self-referencing, 시/구/동 depth 불규칙 대응)

yards              ← 앞마당 (내가 트래킹하는 지역구, region_id 참조)
  └── zones        ← 생활권 (사용자 임의 정의)
       └── complexes          ← 아파트 단지
            └── complex_types ← 평형 타입 (59 / 84 등)
                 └── price_histories ← 월별 가격 데이터
```

---

## 3.2 regions (행정구역)

시/도 → 시/군/구 2단계 구조. parent_id 유무로 구분한다.

```sql
create table regions (
  id         uuid primary key default gen_random_uuid(),
  parent_id  uuid references regions(id),   -- 시/도는 null, 시/군/구는 시/도 참조
  name       text not null
);
```

**데이터 예시**
```
서울특별시     (depth:0, parent:null)
  └── 동대문구 (depth:1)
       └── 휘경동 (depth:2)

경기도         (depth:0, parent:null)
  └── 안양시   (depth:1)
       └── 동안구 (depth:2)
            └── 평촌동 (depth:3)

경기도
  └── 구리시   (depth:1)
       └── 인창동 (depth:2)
```

> 시/군/구/동 데이터는 설정 페이지에서 필요할 때 직접 등록한다.

---

## 3.3 yards (앞마당)

내가 트래킹하는 지역구 단위. regions는 공통코드이고, yards는 그중 내가 관리하는 지역구를 선택하여 기본정보와 입지가치 평가를 기록하는 테이블.

```sql
create table yards (
  id            uuid primary key default gen_random_uuid(),
  region_id     uuid references regions(id) not null,  -- 구 단위 region 참조

  nickname      text,              -- 앞마당 별칭 (예: "평촌", "구리")
  description   text,              -- 메모/특징
  population    text,              -- 인구수 (예: "13만", "18.5만")
  grade         integer,           -- 앞마당 등급 (1~5)

  -- 입지가치 평가 (S / A / B / C)
  val_job       text,              -- 직장
  val_traffic   text,              -- 교통
  val_env       text,              -- 환경
  val_school    text,              -- 학군
  val_supply    text,              -- 공급

  created_at    timestamptz default now()
);
```

> 입지가치 항목별 정량지표 상세 테이블은 추후 확정 시 추가 예정

---

## 3.4 zones (생활권)

법정동과 별개로 사용자가 임의로 정의하는 구역 단위.
(동으로 분류하기 애매한 경우를 포함하기 위해 별도 개념으로 분리)

```sql
create table zones (
  id         uuid primary key default gen_random_uuid(),
  yard_id    uuid references yards(id) not null,  -- 앞마당 참조
  name       text not null                         -- 예: 평촌중심, 범계역세권
);
```

---

## 3.5 complexes (아파트 단지)

### 기본 정보

```sql
create table complexes (
  id           uuid primary key default gen_random_uuid(),
  zone_id      uuid references zones(id) not null,
  region_id    uuid references regions(id) not null,  -- 동(법정동) 레벨
  name         text not null,
  built_year   integer,
  total_units  integer,
  structure    text,        -- 계단식 | 복도식 | 복합식
  rooms        integer,
  bathrooms    integer,
  naver_url    text,

  -- 분석 정보
  preference        integer check (preference between 1 and 5),
  -- 5=상, 4=중상, 3=중, 2=중하, 1=하
  location_values   text[],
  -- 허용값: job(직장) | traffic(교통) | env(환경) | school(학군), 중복 선택 가능

  -- 입지가치 평가 (S / A / B / C)
  val_job       text,
  val_traffic   text,
  val_env       text,
  val_school    text,
  val_supply    text,

  -- 가격 기준점 (수동 입력, 타입별이 아닌 단지 전체 기준)
  price_peak        integer,       -- 전고점 (만원)
  price_peak_date   date,
  price_bottom      integer,       -- 전저점 (만원)
  price_bottom_date date,

  created_at   timestamptz default now()
);
```

> 관심단지 / 투자단지 플래그는 추후 컬럼 추가로 확장 예정

---

## 3.6 complex_types (평형 타입)

단지 하나에 여러 평형(59, 84 등)이 존재하며, **가격 데이터는 타입 기준으로 관리**한다.

```sql
create table complex_types (
  id             uuid primary key default gen_random_uuid(),
  complex_id     uuid references complexes(id) not null,
  type_name      text not null,    -- 예: '59', '84' (사용자 정의 이름)
  supply_area    numeric,          -- 공급면적 (참고용)
  exclusive_area numeric           -- 전용면적 (참고용)
);
```

**예시**
```
래미안○○ (complex)
  ├── 59타입 (complex_type)
  └── 84타입 (complex_type)
```

---

## 3.7 price_histories (월별 가격)

매월 1일 기준으로 `record_date`를 입력한다. (예: `2025-03-01`)

```sql
create table price_histories (
  id                uuid primary key default gen_random_uuid(),
  complex_type_id   uuid references complex_types(id) not null,
  record_date       date not null,     -- YYYY-MM-01 형식으로 월 고정

  sale_asking       integer,           -- 매매 호가 (만원)
  lease_asking      integer,           -- 전세 호가 (만원)
  sale_count        integer,           -- 매매 매물 갯수
  lease_count       integer,           -- 전세 매물 갯수
  sale_actual       integer,           -- 매매 실거래가 (만원, nullable)
  lease_actual      integer,           -- 전세 실거래가 (만원, nullable)
  new_high          integer,           -- 신고가 (만원, nullable, 갱신 시만 입력)

  unique (complex_type_id, record_date)
);
```
