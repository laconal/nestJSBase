import { Controller, Get, Post, Req, Body, Res, Patch, Delete, Query, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dtos/auth-dtos/login.dto';
import { AuthService } from '../application/services/auth.service';
import { type FastifyRequest, type FastifyReply } from 'fastify';
import { ChangePasswordDTO } from './dtos/auth-dtos/change-password.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { type JwtPayload } from '../application/services/token.service';
import { CurrentUser } from 'src/core/interceptors/current-user.decorator';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.NO_CONTENT)
    async login(
        @Body() data: LoginDTO,
        @Res({ passthrough: true }) reply: FastifyReply,
    ) {
        await this.authService.login(data, reply);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.NO_CONTENT)
    async refresh(
        @Req() request: FastifyRequest,
        @Res({ passthrough: true }) reply: FastifyReply,
    ) {
        await this.authService.refresh(request, reply);
        return { message: 'Tokens refreshed' };
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    @ApiCookieAuth("access_token")
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Res({ passthrough: true }) reply: FastifyReply) {
        await this.authService.logout(reply);
        return { message: 'Logged out successfully' };
    }

    @Post("change-password")
    @UseGuards(AuthGuard)
    @ApiCookieAuth("access_token")
    @HttpCode(HttpStatus.NO_CONTENT)
    async changePassword(
        @CurrentUser() user: JwtPayload,
        @Body() data: ChangePasswordDTO,
        @Res({ passthrough: true }) reply: FastifyReply) {
            await this.authService.changePassword({id: user.sub, login: user.login}, data, reply)
        }
}