import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../interface/pokemon.interface';
import { CommonModule } from '@angular/common';
import { getColorForType } from '../../../model/type-element-enum';

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
  
  get typesEtCouleurs(): string[][] {
    let types: string[] = this.pokemonToDisplay.types;
    let couleurs: string[] = types.map(getColorForType);
    return types.map((t, i) => [t, couleurs[i]]);
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

