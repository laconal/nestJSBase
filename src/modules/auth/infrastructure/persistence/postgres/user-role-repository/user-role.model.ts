import { integer, pgTable} from "drizzle-orm/pg-core";
import { UserModel } from "../user-repository/user.model";
import { RoleModel } from "../role-repository/role.model";
import { uniqueIndex } from "drizzle-orm/pg-core";
import {InferSelectModel, InferInsertModel} from "drizzle-orm"

export const UserRoleModel = pgTable("user_roles", {
    userID: integer("user_id").notNull().references(() => UserModel.id, { onDelete: "cascade"}),
    roleID: integer("role_id").notNull().references(() => RoleModel.id, { onDelete: "cascade"})
}, (table) => [
    uniqueIndex("user_roles_unique").on(table.userID, table.roleID)
])

export type UserRoleModel = InferSelectModel<typeof UserRoleModel>
export type UserRoleModelInsert = InferInsertModel<typeof UserRoleModel>