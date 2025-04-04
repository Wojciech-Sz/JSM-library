import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export const getUserByUniversityId = async (universityId: number) => {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.universityId, universityId))
    .limit(1);
  if (existingUser.length > 0) {
    return existingUser[0];
  }
  return null;
};
