import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { ListePokemons, Pokemon } from '../../../interface/pokemon.interface';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.dumb.component.html',
  styleUrl: './pokemon.dumb.component.css',
})

export class PokemonDumbComponent {
  readonly ListePokemons = input.required<ListePokemons>();

  @Output() selectPokemon = new EventEmitter<Pokemon>();
}