import { db } from "~/lib/db";
import { regions } from "~/features/realestate/schema";
import { eq, isNull, and, gt, lt, desc } from "drizzle-orm";
import { data } from "react-router";

const UNIT = 10000000; // 시/도 단위

async function generateRegionId(parentId: number | null): Promise<number> {
  if (!parentId) {
    // 시/도: 10000000, 20000000, 30000000...
    const last = await db
      .select({ id: regions.id })
      .from(regions)
      .where(isNull(regions.parentId))
      .orderBy(desc(regions.id))
      .limit(1);

    return last.length === 0 ? UNIT : last[0].id + UNIT;
  }

  // 시/군/구: parentId + 1, parentId + 2...
  const last = await db
    .select({ id: regions.id })
    .from(regions)
    .where(
      and(eq(regions.parentId, parentId), gt(regions.id, parentId), lt(regions.id, parentId + UNIT))
    )
    .orderBy(desc(regions.id))
    .limit(1);

  return last.length === 0 ? parentId + 1 : last[0].id + 1;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "create") {
    const name = formData.get("name") as string;
    const parentIdStr = formData.get("parentId") as string;
    const parentId = parentIdStr ? Number(parentIdStr) : null;

    if (!name) {
      return data({ error: "이름은 필수입니다." }, { status: 400 });
    }

    const id = await generateRegionId(parentId);
    await db.insert(regions).values({ id, name, parentId });
  }

  if (intent === "update") {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;

    if (!id || !name) {
      return data({ error: "필수 값이 누락되었습니다." }, { status: 400 });
    }

    await db.update(regions).set({ name }).where(eq(regions.id, id));
  }

  if (intent === "delete") {
    const id = Number(formData.get("id"));
    if (!id) {
      return data({ error: "ID가 누락되었습니다." }, { status: 400 });
    }

    await db.delete(regions).where(eq(regions.id, id));
  }

  return { ok: true };
}
