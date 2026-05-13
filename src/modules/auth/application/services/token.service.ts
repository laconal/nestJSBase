import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { jwtConfig } from '../../infrastructure/config/jwt.config';

export interface JwtPayload {
    sub: number;
    login: string;
    pinfl: string;
}

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    signAccessToken(payload: JwtPayload): string {
        return this.jwtService.sign(payload, {
            secret: jwtConfig.access.privateKey,
            expiresIn: jwtConfig.access.expiresIn,
        });
    }

    signRefreshToken(payload: JwtPayload): string {
        return this.jwtService.sign(payload, {
            secret: jwtConfig.refresh.privateKey,
            expiresIn: jwtConfig.refresh.expiresIn,
        });
    }

    verifyAccessToken(token: string): JwtPayload {
        try {
            return this.jwtService.verify<JwtPayload>(token, {
                secret: jwtConfig.access.publicKey,
            });
        } catch {
            throw new UnauthorizedException('Invalid or expired access token');
        }
    }

    verifyRefreshToken(token: string): JwtPayload {
        try {
            return this.jwtService.verify<JwtPayload>(token, {
                secret: jwtConfig.refresh.publicKey,
            });
        } catch {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

    setTokenCookies(reply: FastifyReply, accessToken: string, refreshToken: string): void {
        reply.setCookie('access_token', accessToken, jwtConfig.cookieOptions);
        reply.setCookie('refresh_token', refreshToken, {
            ...jwtConfig.cookieOptions,
            path: '/api/v1/auth/refresh'
        });
    }

    clearTokenCookies(reply: FastifyReply): void {
        reply.clearCookie('access_token', jwtConfig.cookieOptions);
        reply.clearCookie('refresh_token', { ...jwtConfig.cookieOptions, path: '/api/v1/auth/refresh' });
    }

    extractRefreshTokenFromCookie(request: FastifyRequest): string {
        const token = request.cookies?.['refresh_token'];
        if (!token) throw new UnauthorizedException('Refresh token not found');
        return token;
    }
}