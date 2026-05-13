import { RoleEntity } from "../entities/role.entity"

export interface GetRoleInterface {
    id: number
}

export interface CreateRoleInterface {
    name: string
    description?: string
    permissions: number[]
}

export interface GetRolesInterface {
    page: number
    pageSize: number
}

export interface UpdateRoleInterface extends Partial<CreateRoleInterface>, GetRoleInterface {}

export interface DeleteRoleInterface {
   ids: number[]
}

export interface RoleRepositoryInterface {
    create(data: CreateRoleInterface): Promise<RoleEntity>
    find(data: GetRoleInterface): Promise<RoleEntity>
    findMany(data: GetRolesInterface): Promise<RoleEntity[]>
    update(data: UpdateRoleInterface): Promise<RoleEntity | null>
    delete(data: DeleteRoleInterface): Promise<RoleEntity>
}