import { PokemonDto } from './pokemon-dto';
import { JoueurDto } from './joueur-dto';

export class PokemonCaptureDto {

    constructor(
        private _id: number,
        private _joueur: JoueurDto,
        private _pokemon: PokemonDto
    ) { }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get joueur(): JoueurDto {
        return this._joueur;
    }

    public set joueur(value: JoueurDto) {
        this._joueur = value;
    }

    public get pokemon(): PokemonDto {
        return this._pokemon;
    }

    public set pokemon(value: PokemonDto) {
        this._pokemon = value;
    }

    public toJson(): any {
        return {
            joueur: this.joueur.toJsonWithId(),
            pokemon: this.pokemon.toJsonWithId()
        };
    }

    public toJsonWithId(): any {
        return {
            id: this.id,
            joueur: this.joueur.toJsonWithId(),
            pokemon: this.pokemon.toJsonWithId()
        };
    }
}
