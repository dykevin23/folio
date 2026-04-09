import { db } from "~/lib/db";
import { regions } from "~/features/realestate/schema";
import { asc } from "drizzle-orm";

export async function loader() {
  const allRegions = await db
    .select()
    .from(regions)
    .orderBy(asc(regions.name));

  return { regions: allRegions };
}
