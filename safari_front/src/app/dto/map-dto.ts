export class MapDto {

    constructor(
        private _id: number,
        private _nom: string,
        private _lienImage: string
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

    public get lienImage(): string {
        return this._lienImage;
    }

    public set lienImage(value: string) {
        this._lienImage = value;
    }

    public toJson(): any {
        return {
            nom: this.nom,
            lienImage: this.lienImage
        };
    }

    public toJsonWithId(): any {
        return {
            id: this.id,
            nom: this.nom,
            lienImage: this.lienImage
        };
    }
}