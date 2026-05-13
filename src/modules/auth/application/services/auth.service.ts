import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from '../../api/dtos/auth-dtos/login.dto';
import { hashPassword, verifyPassword } from 'src/core/utils/passwordHandler';
import { UserRepository } from '../../infrastructure/persistence/postgres/user-repository/user.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtPayload, TokenService } from './token.service';
import { ChangePasswordDTO } from '../../api/dtos/auth-dtos/change-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService,
    ) {}

    async login(data: LoginDTO, reply: FastifyReply): Promise<void> {
        const hashedPassword = await this.userRepository.getPassword(data.login);
        if (!hashedPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isValid = await verifyPassword(hashedPassword, data.password);
        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const user = await this.userRepository.find({login: data.login})

        const payload: JwtPayload = { sub: user.id, login: user.login, pinfl: user.pinfl };
        const accessToken = this.tokenService.signAccessToken(payload);
        const refreshToken = this.tokenService.signRefreshToken(payload);

        this.tokenService.setTokenCookies(reply, accessToken, refreshToken);
    }

    async refresh(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const refreshToken = this.tokenService.extractRefreshTokenFromCookie(request);
        const payload = this.tokenService.verifyRefreshToken(refreshToken);

        const newPayload: JwtPayload = { sub: payload.sub, login: payload.login, pinfl: payload.pinfl };
        const newAccessToken = this.tokenService.signAccessToken(newPayload);
        const newRefreshToken = this.tokenService.signRefreshToken(newPayload);

        this.tokenService.setTokenCookies(reply, newAccessToken, newRefreshToken);
    }

    async logout(reply: FastifyReply): Promise<void> {
        this.tokenService.clearTokenCookies(reply);
    }

    async changePassword(payload: {id: number, login: string}, data: ChangePasswordDTO, reply: FastifyReply): Promise<void> {
        const hashedPassword = await this.userRepository.getPassword(payload.login)
        if(!hashedPassword) throw new UnauthorizedException("Invalid credentials")

        const isValid = await verifyPassword(hashedPassword, data.oldPassword)
        if (!isValid) throw new UnauthorizedException("Invalid credentials")

        const newHash = await hashPassword(data.newPassword)
        await this.userRepository.update({
            id: payload.id,
            passwordHash: newHash
        })

        const user = await this.userRepository.find({login: payload.login})
        const pload: JwtPayload = {sub: user.id, login: user.login, pinfl: user.pinfl}
        this.tokenService.setTokenCookies(reply,
            this.tokenService.signAccessToken(pload),
            this.tokenService.signRefreshToken(pload)
        )
    }
}