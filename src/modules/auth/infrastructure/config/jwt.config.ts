import { readFileSync } from 'fs';
import { resolve } from 'path';
import {type StringValue } from 'ms';
import "dotenv/config"

const readKey = (envPath: string): Buffer =>
    readFileSync(resolve(process.cwd(), envPath));

export const jwtConfig = {
    access: {
        privateKey: readKey(process.env.JWT_ACCESS_PRIVATE_KEY!),
        publicKey:  readKey(process.env.JWT_ACCESS_PUBLIC_KEY!),
        expiresIn:  (process.env.JWT_ACCESS_EXPIRES_IN  ?? '15m') as StringValue,
    },
    refresh: {
        privateKey: readKey(process.env.JWT_REFRESH_PRIVATE_KEY!),
        publicKey:  readKey(process.env.JWT_REFRESH_PUBLIC_KEY!),
        expiresIn:  (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d')  as StringValue,
    },
    cookieOptions: {
        httpOnly: true,
        secure:   process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path:     '/',
    },
} as const;