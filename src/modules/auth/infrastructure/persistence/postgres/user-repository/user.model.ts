import { integer, pgTable, varchar, 
    pgEnum, text, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { baseFields } from "src/modules/auth/infrastructure/persistence/postgres/BaseFields";
import { LOGIN_MAX_LENGTH } from "src/shared/consts/contraints.consts";
import {InferSelectModel, InferInsertModel} from "drizzle-orm"

export const typeEnum = pgEnum("types", ["internal", "external"])

export const UserModel = pgTable("users", {
    ...baseFields,
    login: varchar({length: LOGIN_MAX_LENGTH}).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    firstName: varchar("first_name", {length: 255}).notNull(),
    lastName: varchar("last_name", {length: 255}).notNull(),
    middleName: varchar("middle_name", {length: 255}),
    pinfl: varchar({length: 14}).unique().notNull(),
    permissions: integer().array(),
    type: typeEnum().default("internal").notNull(),
}, (table) => [
    check(
        "pinfl_14_digits",
        sql`${table.pinfl} ~ '^[0-9]{14}'`
    )
])

export type UserType = typeof typeEnum.enumValues[number]
export type UserModel = InferSelectModel<typeof UserModel>
export type UserModelInsert = InferInsertModel<typeof UserModel>