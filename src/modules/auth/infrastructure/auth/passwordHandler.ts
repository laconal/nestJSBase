import argon2 from "argon2"

export class PasswordHandler {
    constructor () {}
    
    async hashPassword(password: string): Promise<string> {
        return argon2.hash(password)
    }

    async verifyPassword(hash: string, password: string): Promise<boolean> {
        return argon2.verify(hash, password)
    }
}