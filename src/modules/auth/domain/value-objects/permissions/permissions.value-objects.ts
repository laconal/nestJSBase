export class PermissionVO {
  public readonly id: number;
  public readonly code: string;
  public readonly name: string;

  constructor(id: number, code: string, name: string) {
    if (!code.startsWith("AUTH_")) {
      throw new Error("Invalid permission code");
    }

    this.id = id;
    this.code = code;
    this.name = name;

    Object.freeze(this);
  }

  equals(other: PermissionVO): boolean {
    return this.id === other.id &&
           this.code === other.code &&
           this.name === other.name;
  }
}