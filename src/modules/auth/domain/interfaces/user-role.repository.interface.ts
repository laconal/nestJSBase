import { UserEntity } from "../entities/user.entity"

export interface AssignRevokeRoleInterface {
    roleIDs: number[]
    userIDs: number[]
}

export const USER_ROLE_REPOSITORY = Symbol("USER_ROLE_REPOSITORY")

export interface UserRoleRepositoryInterface {
    assign(data: AssignRevokeRoleInterface): Promise<UserEntity[]>
    revoke(data: AssignRevokeRoleInterface): Promise<UserEntity[]>
}