import { eq, inArray } from "drizzle-orm";
import { RoleModel } from "./role.model";
import { Inject, Injectable } from "@nestjs/common";
import { RoleRepositoryInterface, CreateRoleInterface, UpdateRoleInterface, DeleteRoleInterface, GetRoleInterface, GetRolesInterface } from "src/modules/auth/domain/interfaces/role.repository.interface";
import { RoleMapper } from "../../../mappers/role.mapper";

@Injectable()
export class RoleRepository implements RoleRepositoryInterface {
    constructor(
        @Inject("DRIZZLE") protected postgresDB: any
    ) {}

    async create(data: CreateRoleInterface) {
        const [result] = await this.postgresDB.insert(RoleModel).values(data).returning()
        return RoleMapper.toDomain(result)
    }

    async find(data: GetRoleInterface) {
        const [result] = await this.postgresDB.select().from(RoleModel).
            where(eq(RoleModel.id, data.id))
        return RoleMapper.toDomain(result)
    }

    async findMany(data: GetRolesInterface) {
        const pageSize = data.pageSize!;
        const offset = (data.page! - 1) * pageSize;

        const result = await this.postgresDB.select().from(RoleModel)
            .limit(pageSize).offset(offset)
        return result.map(RoleMapper.toDomain)
    }

    async update(data: UpdateRoleInterface) {
        const { id, ...updateFields } = data;
        const [result] = await this.postgresDB.update(RoleModel)
            .set(updateFields).where(eq(RoleModel.id, data.id)).returning()
        return result ? RoleMapper.toDomain(result) : null
    }

    async delete(data: DeleteRoleInterface) {
        const result = await this.postgresDB.delete(RoleModel).
            where(inArray(RoleModel.id, data.ids)).returning()
        return result.length
    }
}