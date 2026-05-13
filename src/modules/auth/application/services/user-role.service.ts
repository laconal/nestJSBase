import { Inject, Injectable } from '@nestjs/common';
import { AssignRevokeRoleDTO } from '../../api/dtos/user-role-dto/user-role.dto';
import { USER_ROLE_REPOSITORY } from '../../domain/interfaces/user-role.repository.interface';
import { UserRoleRepository } from '../../infrastructure/persistence/postgres/user-role-repository/user-role.repository';

@Injectable()
export class UserRoleService {
    constructor(
        @Inject(USER_ROLE_REPOSITORY)
        private readonly userRoleRepository: UserRoleRepository
    ) {}

    async assignRole(data: AssignRevokeRoleDTO) {
        const result = await this.userRoleRepository.assign(data)
        return result
    }

    async revokeRole(data: AssignRevokeRoleDTO) {
        const result = await this.userRoleRepository.revoke(data)
        return result
    }
}
