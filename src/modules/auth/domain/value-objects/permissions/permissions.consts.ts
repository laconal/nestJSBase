import { PermissionVO } from "./permissions.value-objects";

class RangeID {
    constructor(
        public readonly start: number,
        public readonly end: number
    ) {
        if (start > end) throw new Error("Invalid range")
    }
}

class AuthPermissionRegistry {
  private static readonly permissions = [
    new PermissionVO(1001, "AUTH_GET_USERS", "Get users"),
    new PermissionVO(1002, "AUTH_CREATE_USER", "Create user"),
    new PermissionVO(1003, "AUTH_UPDATE_USER", "Update user"),
    new PermissionVO(1004, "AUTH_DELETE_USER", "Delete user"),
  ];

  static getAll(): PermissionVO[] {
    return this.permissions;
  }

  static getByRange(range: RangeID): PermissionVO[] {
    return this.permissions.filter(
        p => p.id >= range.start && p.id <= range.end
    )
  }

  static findByCode(code: string): PermissionVO | undefined {
    return this.permissions.find(p => p.code === code);
  }
}