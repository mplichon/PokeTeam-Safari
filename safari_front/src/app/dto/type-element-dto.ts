export class TypeElementDto {

    constructor(
        private _key: string,
        private _nom: string
    ) { }

    public get key(): string {
        return this._key;
    }

    public set key(value: string) {
        this._key = value;
    }

    public get nom(): string {
        return this._nom;
    }

    public set nom(value: string) {
        this._nom = value;
    }

    public toJson(): any {
        return {
            key: this.key,
            nom: this.nom
        };
    }
}
