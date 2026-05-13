import { Inject, Injectable } from "@nestjs/common";
import { UserRoleModel } from "../user-role-repository/user-role.model";
import { and, inArray} from "drizzle-orm";
import { UserMapper } from "../../../mappers/user-role.mapper";
import { AssignRevokeRoleInterface, UserRoleRepositoryInterface } from "src/modules/auth/domain/interfaces/user-role.repository.interface";
import { UserRepository } from "../user-repository/user.repository";


@Injectable()
export class UserRoleRepository implements UserRoleRepositoryInterface {
    constructor(
        @Inject("DRIZZLE") protected postgresDB: any,
        public readonly userRepository: UserRepository
    ) {}

    async assign(data: AssignRevokeRoleInterface) {
        const { roleIDs: roleIDs = [], userIDs: userID = []} = data

        const values = userID.flatMap(userID => roleIDs.map(
            roleID => ({
                userID, roleID
            })
        ))
        await this.postgresDB.insert(UserRoleModel).values(values).onConflictDoNothing().returning()
        const users = await this.userRepository.findMany({ids: userID})
        return users.map(user => ({
            ...UserMapper.toDomain(user), roles: roleIDs
        }))
    }

    async revoke(data: AssignRevokeRoleInterface) {
        const { roleIDs = [], userIDs = [] } = data

        await this.postgresDB
            .delete(UserRoleModel)
            .where(
                and(
                    inArray(UserRoleModel.userID, userIDs),
                    inArray(UserRoleModel.roleID, roleIDs),
                ),
            )

        const users = await this.userRepository.findMany({
            ids: userIDs,
        })

        const userRoles = await this.postgresDB
            .select()
            .from(UserRoleModel)
            .where(inArray(UserRoleModel.userID, userIDs))

        return users.map(user => ({
            ...UserMapper.toDomain(user),

            roles: userRoles
                .filter(r => r.userID === user.id)
                .map(r => r.roleID),
        }))
    }
}