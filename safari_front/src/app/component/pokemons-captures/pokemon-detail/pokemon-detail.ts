import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../interface/pokemon.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail {
  @Input() pokemon: Pokemon | null = null;

  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  
  defaultPokemon: Pokemon = {
    id: 0,
    name: '???',
    sprite: 'assets/whosthatpkmn.png',  // ton image noire
    types: ['Inconnu']
  };

  get pokemonToDisplay(): Pokemon {
    return this.pokemon ?? this.defaultPokemon;
  }

 Previous() {
    console.log("previous clicked");  // ← vérifie que ça apparaît en console
    this.previous.emit();
  }

  Next() {
    console.log("next clicked");  // ← vérifie que ça apparaît en console
    this.next.emit();
  }
}

