import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail {
  @Input() pokemon: Pokemon | null = null;

  defaultPokemon: Pokemon = {
    id: 0,
    name: '???',
    sprite: 'assets/whosthatpkmn.png',  // ton image noire
    types: ['Inconnu']
  };

  get pokemonToDisplay(): Pokemon {
    return this.pokemon ?? this.defaultPokemon;
  }
}
