import { Controller, Get, Post, Body, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../application/services/user.service';
import { CreateUserDTO } from './dtos/user-dtos/create-user.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UpdateUserDTO } from './dtos/user-dtos/update-user.dto';
import { GetUsersDTO } from './dtos/user-dtos/get-users.dto';

@ApiTags("users")
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    @ApiCookieAuth("access_token")
    async findMany(@Query() query: GetUsersDTO) {
        return this.userService.findMany(query); 
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiCookieAuth("access_token")
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
    }

    @Patch()
    @UseGuards(AuthGuard)
    @ApiCookieAuth("access_token")
    async update(@Body() data: UpdateUserDTO) {
        return this.userService.update(data)
    }

    @Delete()
    @UseGuards(AuthGuard)
    @ApiCookieAuth("access_token")
    async delete(@Query('ids') query: string) {
        return this.userService.delete(query)
    }
}