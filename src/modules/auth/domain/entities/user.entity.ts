export class UserEntity {
    constructor(
        public readonly id: number,
        public readonly login: string,
        public firstName: string,
        public lastName: string,
        public pinfl: string,
        public type: string,
        public createdAt: Date,
        public updatedAt: Date,
        public middleName?: string,
        public permissions?: number[],
        public roles?: number[]
    ) {}
}