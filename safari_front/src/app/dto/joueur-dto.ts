export class JoueurDto {

    constructor(
        private _id: number,
        private _login: string,
        private _surnom: string
    ) { }

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

    public get surnom(): string {
        return this._surnom;
    }

    public set surnom(value: string) {
        this._surnom = value;
    }

    public toJson(): any {
        return {
            login: this.login,
            surnom: this.surnom
        };
    }

    public toJsonWithId(): any {
        return {
            id: this.id,
            login: this.login,
            surnom: this.surnom
        };
    }
}
