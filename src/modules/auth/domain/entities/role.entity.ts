export class RoleEntity {
    constructor(
        public readonly id: number,
        public name: string,
        public permissions: number[],
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public description?: string,
    ) {}
}