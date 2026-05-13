import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from 'src/modules/auth/application/services/token.service';
import type { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const token = request.cookies?.['access_token'];

        if (!token) throw new UnauthorizedException('Access token not found');

        const payload = this.tokenService.verifyAccessToken(token);
        request['user'] = payload;
        return true;
    }
}