import { UserEntity } from "../entities/user.entity"
import type { UserModelInsert, UserModel } from "../../infrastructure/persistence/postgres/user-repository/user.model"

export interface GetUserInterface extends Partial<Pick<UserModel, "id" | "login" | "pinfl">> {}

export interface GetUsersInterface {
    ids?: number[]
    page?: number
    pageSize?: number
}

export interface UpdateUserInterface extends Partial<Omit<UserModelInsert, | "createdAt" | "updatedAt">> {
    id: number
}

export interface CreateUserInterface extends Omit<UserModelInsert, "passwordHash" | "archivedAt" | "createdAt" | "updatedAt"> {
    password: string
}

export interface DeleteUserInterface {
    ids: number[]
}

export interface ChangePasswordInterface {
    old: string
    new: string
}

export interface AssignRevokePermissionsInterface {
    permissionIDs: number[]
    userIDs: number[]
}

export interface UserRepositoryInterface {
    create(data: CreateUserInterface): Promise<UserEntity>
    update(data: UpdateUserInterface): Promise<UserEntity>
    find(data: GetUserInterface): Promise<UserEntity>
    findMany(data: GetUsersInterface): Promise<UserEntity[]>
    delete(data: DeleteUserInterface): Promise<number>
}