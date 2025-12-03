export class JoueurDto {

    constructor(
        private _id: number,
        private _username: string,
        private _surnom: string,
        private _nbPokeball: number,
        private _nbFriandise: number,
        private _nbBoue: number
    ) { }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get surnom(): string {
        return this._surnom;
    }

    public set surnom(value: string) {
        this._surnom = value;
    }

    public get nbPokeball(): number {
        return this._nbPokeball;
    }

    public set nbPokeball(value: number) {
        this._nbPokeball = value;
    }

    public get nbFriandise(): number {
        return this._nbFriandise;
    }

    public set nbFriandise(value: number) {
        this._nbFriandise = value;
    }

    public get nbBoue(): number {
        return this._nbBoue;
    }

    public set nbBoue(value: number) {
        this._nbBoue = value;
    }

    public toJson(): any {
        return {
            username: this.username,
            surnom: this.surnom,
            inventaire: {
                nbPokeball: this.nbPokeball,
                nbFriandise: this.nbFriandise,
                nbBoue: this.nbBoue
            }
        };
    }

    public toJsonWithId(): any {
        return {
            id: this.id,
            username: this.username,
            surnom: this.surnom,
            inventaire: {
                nbPokeball: this.nbPokeball,
                nbFriandise: this.nbFriandise,
                nbBoue: this.nbBoue
            }
        };
    }
}
