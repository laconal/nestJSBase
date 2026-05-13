import { Inject, Injectable } from "@nestjs/common";
import { UserModel } from "./user.model";
import { eq, inArray, or, sql} from "drizzle-orm";
import { UserMapper } from "../../../mappers/user-role.mapper";
import { AssignRevokePermissionsInterface, CreateUserInterface, DeleteUserInterface, GetUserInterface, GetUsersInterface, UpdateUserInterface, UserRepositoryInterface } from "src/modules/auth/domain/interfaces/user.repository.interface";
import { UserRoleModel } from "../user-role-repository/user-role.model";


@Injectable()
export class UserRepository implements UserRepositoryInterface {
    constructor(
        @Inject("DRIZZLE") protected postgresDB: any
    ) {}

    async create(data: CreateUserInterface) {
        const [result] = await this.postgresDB.insert(UserModel).values({
            login: data.login,
            passwordHash: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName,
            pinfl: data.pinfl,
            type: data.type
        }).returning()
        return UserMapper.toDomain(result)
    }

    async find(data: GetUserInterface) {
        const conditions = []
        if (data.id !== undefined) {
            conditions.push(eq(UserModel.id, data.id))
        } else if (data.pinfl !== undefined) {
            conditions.push(eq(UserModel.pinfl, data.pinfl))
        } else if (data.login !== undefined) {
            conditions.push(eq(UserModel.login, data.login))
        }

        const [user] = await this.postgresDB.select().from(UserModel).where(or(...conditions))
        if (!user) return null
        const userRoles = await this.postgresDB
            .select()
            .from(UserRoleModel)
            .where(eq(UserRoleModel.userID, user.id))
        return {
            ...UserMapper.toDomain(user),
            roles: userRoles.map(r => r.roleID),
        }
    }

    async findMany(data: GetUsersInterface) {
        let users

        const pageSize = data.pageSize!
        const offset = (data.page! - 1) * pageSize

        if (data.ids && data.ids.length >= 1) {
            users = await this.postgresDB
                .select()
                .from(UserModel)
                .where(inArray(UserModel.id, data.ids))
        } else {
            users = await this.postgresDB
                .select()
                .from(UserModel)
                .limit(pageSize)
                .offset(offset)
        }

        const userIDs = users.map(user => user.id)

        const userRoles = await this.postgresDB
            .select()
            .from(UserRoleModel)
            .where(inArray(UserRoleModel.userID, userIDs))

        return users.map(user => ({
            ...UserMapper.toDomain(user),

            roles: userRoles
                .filter(role => role.userID === user.id)
                .map(role => role.roleID),
        }))
    }

    async update(data: UpdateUserInterface) {
        const { id, ...updateFields } = data;

        const [result] = await this.postgresDB.update(UserModel)
            .set(updateFields).where(eq(UserModel.id, data.id)).returning()

        return result ? UserMapper.toDomain(result) : null
    }

    async delete(data: DeleteUserInterface) {
        const result = await this.postgresDB.delete(UserModel).
            where(inArray(UserModel.id, data.ids)).returning()
        return result.length
    }

    async getPassword(login: string): Promise<string> {
        const result = await this.postgresDB.select().from(UserModel).
            where(eq(UserModel.login, login))
        return result[0].passwordHash
    }

    async assignPermissions(data: AssignRevokePermissionsInterface) {
        await this.postgresDB
            .update(UserModel)
            .set({
                permissions: sql`
                    (
                        SELECT array_agg(DISTINCT p)
                        FROM unnest(
                            coalesce(${UserModel.permissions}, ARRAY[]::int[])
                            || ARRAY[${sql.join(data.permissionIDs, sql`, `)}]::int[]
                        ) AS p
                    )
                `
            })
            .where(inArray(UserModel.id, data.userIDs));
        const users = await this.findMany({ids: data.userIDs})
        return users.map(UserMapper.toDomain)
    }

    async revokePermissions(data: AssignRevokePermissionsInterface) {
        await this.postgresDB
            .update(UserModel)
            .set({
                permissions: sql`
                    (
                        SELECT array_agg(p)
                        FROM unnest(
                            coalesce(${UserModel.permissions}, ARRAY[]::int[])
                        ) AS p
                        WHERE NOT (p = ANY(ARRAY[${sql.join(data.permissionIDs, sql`, `)}]::int[]))
                    )
                `
            })
            .where(inArray(UserModel.id, data.userIDs));
        const users = await this.findMany({ids: data.userIDs})
        return users.map(UserMapper.toDomain)
    }
}