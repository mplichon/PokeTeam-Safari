export class PokemonDto {

    constructor(
        private _id: number,
        private _nom: string,
        private _type: string,
        private _niveau: number
    ) { }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get nom(): string {
        return this._nom;
    }

    public set nom(value: string) {
        this._nom = value;
    }

    public get type(): string {
        return this._type;
    }

    public set type(value: string) {
        this._type = value;
    }

    public get niveau(): number {
        return this._niveau;
    }

    public set niveau(value: number) {
        this._niveau = value;
    }

    public toJson(): any {
        return {
            nom: this.nom,
            type: this.type,
            niveau: this.niveau
        };
    }

    public toJsonWithId(): any {
        return {
            id: this.id,
            nom: this.nom,
            type: this.type,
            niveau: this.niveau
        };
    }
}
