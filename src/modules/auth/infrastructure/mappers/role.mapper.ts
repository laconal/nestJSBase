import { RoleEntity } from "../../domain/entities/role.entity";
import type { RoleModel } from "../persistence/postgres/role-repository/role.model";

export class RoleMapper {
    static toDomain = (raw: RoleModel): RoleEntity => {
        return new RoleEntity(
            raw.id,
            raw.name,
            raw.permissions,
            raw.createdAt,
            raw.updatedAt,
            raw.description ?? null
        )
    }
}