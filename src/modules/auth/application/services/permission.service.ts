import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/persistence/postgres/user-repository/user.repository';
import { AssignRevokeRoleDTO } from '../../api/dtos/user-role-dto/user-role.dto';
import { AssignRevokePermissionDTO } from '../../api/dtos/permission-dto/permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async assignRole(data: AssignRevokePermissionDTO) {
        const result = await this.userRepository.assignPermissions(data)
        return result
    }

    async revokeRole(data: AssignRevokePermissionDTO) {
        const result = await this.userRepository.revokePermissions(data)
        return result
    }
}
