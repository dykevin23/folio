import {
  pgTable,
  uuid,
  text,
  integer,
  numeric,
  date,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

// 행정구역 (self-referencing)
export const regions = pgTable("regions", {
  id: uuid("id").primaryKey().defaultRandom(),
  parentId: uuid("parent_id").references((): any => regions.id),
  name: text("name").notNull(),
  type: text("type").notNull(),
  depth: integer("depth").notNull(),
});

// 앞마당 (내가 트래킹하는 지역구)
export const yards = pgTable("yards", {
  id: uuid("id").primaryKey().defaultRandom(),
  regionId: uuid("region_id")
    .references(() => regions.id)
    .notNull(),

  nickname: text("nickname"),
  description: text("description"),
  population: text("population"),
  grade: integer("grade"),

  valJob: text("val_job"),
  valTraffic: text("val_traffic"),
  valEnv: text("val_env"),
  valSchool: text("val_school"),
  valSupply: text("val_supply"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 생활권
export const zones = pgTable("zones", {
  id: uuid("id").primaryKey().defaultRandom(),
  yardId: uuid("yard_id")
    .references(() => yards.id)
    .notNull(),
  name: text("name").notNull(),
});

// 아파트 단지
export const complexes = pgTable("complexes", {
  id: uuid("id").primaryKey().defaultRandom(),
  zoneId: uuid("zone_id")
    .references(() => zones.id)
    .notNull(),
  regionId: uuid("region_id")
    .references(() => regions.id)
    .notNull(),
  name: text("name").notNull(),
  builtYear: integer("built_year"),
  totalUnits: integer("total_units"),
  structure: text("structure"),
  rooms: integer("rooms"),
  bathrooms: integer("bathrooms"),
  naverUrl: text("naver_url"),

  preference: integer("preference"),
  locationValues: text("location_values").array(),

  valJob: text("val_job"),
  valTraffic: text("val_traffic"),
  valEnv: text("val_env"),
  valSchool: text("val_school"),
  valSupply: text("val_supply"),

  pricePeak: integer("price_peak"),
  pricePeakDate: date("price_peak_date"),
  priceBottom: integer("price_bottom"),
  priceBottomDate: date("price_bottom_date"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 평형 타입
export const complexTypes = pgTable("complex_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  complexId: uuid("complex_id")
    .references(() => complexes.id)
    .notNull(),
  typeName: text("type_name").notNull(),
  supplyArea: numeric("supply_area"),
  exclusiveArea: numeric("exclusive_area"),
});

// 월별 가격
export const priceHistories = pgTable(
  "price_histories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    complexTypeId: uuid("complex_type_id")
      .references(() => complexTypes.id)
      .notNull(),
    recordDate: date("record_date").notNull(),

    saleAsking: integer("sale_asking"),
    leaseAsking: integer("lease_asking"),
    saleCount: integer("sale_count"),
    leaseCount: integer("lease_count"),
    saleActual: integer("sale_actual"),
    leaseActual: integer("lease_actual"),
    newHigh: integer("new_high"),
  },
  (t) => [unique().on(t.complexTypeId, t.recordDate)]
);
