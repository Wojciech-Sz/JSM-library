import {
  uuid,
  text,
  pgTable,
  integer,
  pgEnum,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  universityId: integer("university_id").notNull().unique(),
  universityCard: text("university_card").notNull(),
  role: ROLE_ENUM("role").notNull().default("USER"),
  status: STATUS_ENUM("status").notNull().default("PENDING"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
