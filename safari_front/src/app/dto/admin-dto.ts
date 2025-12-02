export class AdminDto {
  constructor(
    private _id: number,
    private _login: string,
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get login(): string {
    return this._login;
  }

  public set login(value: string) {
    this._login = value;
  }

  public toJson(): any {
    return {
      login: this.login
    };
  }

  public toJsonWithId(): any {
    return {
      id: this.id,
      login: this.login
    };
  }
}