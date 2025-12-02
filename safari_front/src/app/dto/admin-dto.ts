export class AdminDto {
  constructor(
    private _id?: number,
    private _login: string = '',
    private _admin: boolean = true
  ) {}

  public get id(): number | undefined {
    return this._id;
  }

  public set id(value: number | undefined) {
    this._id = value;
  }

  public get login(): string {
    return this._login;
  }

  public set login(value: string) {
    this._login = value;
  }

  public get admin(): boolean {
    return this._admin;
  }

  public set admin(value: boolean) {
    this._admin = value;
  }

  public toJson(): any {
    return {
      login: this.login,
      admin: this.admin
    };
  }

  public toJsonWithId(): any {
    return {
      id: this.id,
      login: this.login,
      admin: this.admin
    };
  }
}