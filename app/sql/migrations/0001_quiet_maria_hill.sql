CREATE TABLE "yards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"region_id" uuid NOT NULL,
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
ALTER TABLE "zones" DROP CONSTRAINT "zones_region_id_regions_id_fk";
--> statement-breakpoint
ALTER TABLE "complexes" ADD COLUMN "val_job" text;--> statement-breakpoint
ALTER TABLE "complexes" ADD COLUMN "val_traffic" text;--> statement-breakpoint
ALTER TABLE "complexes" ADD COLUMN "val_env" text;--> statement-breakpoint
ALTER TABLE "complexes" ADD COLUMN "val_school" text;--> statement-breakpoint
ALTER TABLE "complexes" ADD COLUMN "val_supply" text;--> statement-breakpoint
ALTER TABLE "zones" ADD COLUMN "yard_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "yards" ADD CONSTRAINT "yards_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zones" ADD CONSTRAINT "zones_yard_id_yards_id_fk" FOREIGN KEY ("yard_id") REFERENCES "public"."yards"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zones" DROP COLUMN "region_id";