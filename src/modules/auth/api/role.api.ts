import { Controller, Get, Post, Body, Patch, Delete, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from '../application/services/role.service';
import { UpdateRoleDTO } from './dtos/role-dtos/update-role.dto';
import { GetRolesDTO } from './dtos/role-dtos/get-roles.dto';
import { CreateRoleDTO } from './dtos/role-dtos/create-role.dto';
import { DeleteRoleDTO } from './dtos/role-dtos/delete-role.dto';
import { GetRoleDTO } from './dtos/role-dtos/get-role.dto';

@ApiTags("roles")
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get(':id')
    async find(@Param() data: GetRoleDTO) {
        console.log(data.id)
        return this.roleService.getRole(data)
    }

    @Get()
    async findMany(@Query() data: GetRolesDTO) {
        return this.roleService.getRoles(data)
    }

    @Post()
    async create(@Body() data: CreateRoleDTO) {
        console.log(JSON.stringify(data))
        return this.roleService.createRole(data)
    }

    @Patch()
    async update(@Body() data: UpdateRoleDTO) {
        return this.roleService.updateRole(data)
    }

    @Delete()
    async delete(@Body() data: DeleteRoleDTO) {
        return this.roleService.deleteRole(data)
    }
}