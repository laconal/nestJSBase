import { UserEntity } from "../../domain/entities/user.entity";
import { type UserModel } from "../persistence/postgres/user-repository/user.model";

type UserWithRoles = UserModel & {
    roles?: number[]
}

export class UserMapper {
    static toDomain = (raw: UserWithRoles): UserEntity => {
        return new UserEntity(
            raw.id,
            raw.login,
            raw.firstName,
            raw.lastName,
            raw.pinfl,
            raw.type,
            raw.createdAt,
            raw.updatedAt,
            raw.middleName,
            raw.permissions,
            raw.roles
        )
    }
}