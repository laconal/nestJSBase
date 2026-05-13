import { UserEntity } from "../../domain/entities/user.entity"

export class UserMapper {
    static toDomain = (raw: UserEntity): UserEntity => {
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