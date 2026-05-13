import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from '../../api/dtos/role-dtos/create-role.dto';
import { RoleRepository } from '../../infrastructure/persistence/postgres/role-repository/role.repository';
import { GetRolesDTO } from '../../api/dtos/role-dtos/get-roles.dto';
import { UpdateRoleDTO } from '../../api/dtos/role-dtos/update-role.dto';
import { DeleteRoleDTO } from '../../api/dtos/role-dtos/delete-role.dto';
import { GetRoleDTO } from '../../api/dtos/role-dtos/get-role.dto';

@Injectable()
export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) {}

    async createRole(data: CreateRoleDTO) {
        const role = await this.roleRepository.create(data)
        return role
    }

    async getRole(data: GetRoleDTO) {
        const role = await this.roleRepository.find(data)
        return role
    }

    async getRoles(data: GetRolesDTO) {
        const roles = await this.roleRepository.findMany(data)
        return roles
    }

    async updateRole(data: UpdateRoleDTO) {
        const role = await this.roleRepository.update(data)
        return role
    }

    async deleteRole(data: DeleteRoleDTO) {
        const result = await this.roleRepository.delete(data)
        return result
    }
}
