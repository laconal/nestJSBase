import { Controller, Get, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRoleService } from '../application/services/user-role.service';
import { AssignRevokeRoleDTO } from './dtos/user-role-dto/user-role.dto';

@ApiTags("user-roles")
@Controller('user-roles')
export class UserRoleController {
    constructor(private readonly userRoleService: UserRoleService) {}

    @Post("assign")
    async assignRole(@Body() data: AssignRevokeRoleDTO) {
        return this.userRoleService.assignRole(data)
    }

    @Patch("revoke")
    async revokeRole(@Body() data: AssignRevokeRoleDTO) {
        return this.userRoleService.revokeRole(data)
    } 
}