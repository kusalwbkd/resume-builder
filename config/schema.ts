import { boolean, integer, json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  userName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isMember: boolean().default(false),
  customerId: varchar(),
  tokenCount: integer().default(0)

});

export const resumeTable = pgTable("resume", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  userName: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow(),
  firstName: varchar({ length: 255 }),
  lastName: varchar({ length: 255 }),
  linkedIn: varchar({ length: 255 }),
  gitHub: varchar({ length: 255 }),
  website: varchar({ length: 255 }),
  jobTitle: varchar({ length: 255 }),
  address: varchar({ length: 255 }),
  phone: varchar({ length: 40 }),
  photo: varchar({ length: 255 }),
  themeColor: varchar({ length: 40 }),
  summary: text(),
  experience: text(),
  skills: text(),
  education: text(),
  projects:text(),
  refrees:text(),
  cover_letter:text(),
  languages:varchar({ length: 255 }),
  notice_period:varchar({ length: 255 }),

});