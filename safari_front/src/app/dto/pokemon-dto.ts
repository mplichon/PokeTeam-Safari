export class PokemonDto {

    constructor(
        private _id: number,
        private _nom: string,
        private _tauxCapture: number,
        private _tauxFuite: number,
        private _facteurApparition: number,
        private _type1: string,
        private _type2: string | null
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

    public get tauxCapture(): number {
        return this._tauxCapture;
    }

    public set tauxCapture(value: number) {
        this._tauxCapture = value;
    }

    public get tauxFuite(): number {
        return this._tauxFuite;
    }

    public set tauxFuite(value: number) {
        this._tauxFuite = value;
    }

    public get facteurApparition(): number {
        return this._facteurApparition;
    }

    public set facteurApparition(value: number) {
        this._facteurApparition = value;
    }

    public get type1(): string {
        return this._type1;
    }

    public set type1(value: string) {
        this._type1 = value;
    }

    public get type2(): string | null {
        return this._type2;
    }

    public set type2(value: string | null) {
        this._type2 = value;
    }

    public toJson(): any {
        return {
            nom: this.nom,
            tauxCapture: this.tauxCapture,
            tauxFuite: this.tauxFuite,
            facteurApparition: this.facteurApparition,
            type1: this.type1,
            type2: this.type2
        };
    }

    public toJsonWithId(): any {
        return {
            id: this.id,
            nom: this.nom,
            tauxCapture: this.tauxCapture,
            tauxFuite: this.tauxFuite,
            facteurApparition: this.facteurApparition,
            type1: this.type1,
            type2: this.type2
        };
    }
}
