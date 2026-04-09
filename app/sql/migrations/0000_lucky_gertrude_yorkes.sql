CREATE TABLE "complex_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"complex_id" uuid NOT NULL,
	"type_name" text NOT NULL,
	"supply_area" numeric,
	"exclusive_area" numeric
);
--> statement-breakpoint
CREATE TABLE "complexes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"zone_id" uuid NOT NULL,
	"region_id" integer NOT NULL,
	"name" text NOT NULL,
	"built_year" integer,
	"total_units" integer,
	"structure" text,
	"rooms" integer,
	"bathrooms" integer,
	"naver_url" text,
	"preference" integer,
	"location_values" text[],
	"val_job" text,
	"val_traffic" text,
	"val_env" text,
	"val_school" text,
	"val_supply" text,
	"price_peak" integer,
	"price_peak_date" date,
	"price_bottom" integer,
	"price_bottom_date" date,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "price_histories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"complex_type_id" uuid NOT NULL,
	"record_date" date NOT NULL,
	"sale_asking" integer,
	"lease_asking" integer,
	"sale_count" integer,
	"lease_count" integer,
	"sale_actual" integer,
	"lease_actual" integer,
	"new_high" integer,
	CONSTRAINT "price_histories_complex_type_id_record_date_unique" UNIQUE("complex_type_id","record_date")
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" integer PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "yards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"region_id" integer NOT NULL,
	"nickname" text,
	"description" text,
	"population" text,
	"grade" integer,
	"val_job" text,
	"val_traffic" text,
	"val_env" text,
	"val_school" text,
	"val_supply" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "zones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"yard_id" uuid NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "complex_types" ADD CONSTRAINT "complex_types_complex_id_complexes_id_fk" FOREIGN KEY ("complex_id") REFERENCES "public"."complexes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complexes" ADD CONSTRAINT "complexes_zone_id_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complexes" ADD CONSTRAINT "complexes_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_histories" ADD CONSTRAINT "price_histories_complex_type_id_complex_types_id_fk" FOREIGN KEY ("complex_type_id") REFERENCES "public"."complex_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regions" ADD CONSTRAINT "regions_parent_id_regions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "yards" ADD CONSTRAINT "yards_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zones" ADD CONSTRAINT "zones_yard_id_yards_id_fk" FOREIGN KEY ("yard_id") REFERENCES "public"."yards"("id") ON DELETE no action ON UPDATE no action;