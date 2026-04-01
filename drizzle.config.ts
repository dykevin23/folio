import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/features/**/schema.ts",
  out: "./app/sql/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
