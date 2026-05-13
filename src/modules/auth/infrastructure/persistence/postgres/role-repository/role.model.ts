import { integer, pgTable, text} from "drizzle-orm/pg-core";
import { baseFields } from "../BaseFields";
import {InferSelectModel, InferInsertModel} from "drizzle-orm"

export const RoleModel = pgTable("roles", {
    ...baseFields,
    name: text().unique().notNull(),
    description: text(),
    permissions: integer().array(),
}) 

export type RoleModel = InferSelectModel<typeof RoleModel>
export type RoleModelInsert = InferInsertModel<typeof RoleModel>