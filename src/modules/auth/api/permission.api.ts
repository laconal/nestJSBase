import { Controller, Get, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionService } from '../application/services/permission.service';
import { AssignRevokePermissionDTO } from './dtos/permission-dto/permission.dto';

@ApiTags("permissions")
@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Post("assign")
    async assignRole(@Body() data: AssignRevokePermissionDTO) {
        return this.permissionService.assignRole(data)
    }

    @Patch("revoke")
    async revokeRole(@Body() data: AssignRevokePermissionDTO) {
        return this.permissionService.revokeRole(data)
    } 
}