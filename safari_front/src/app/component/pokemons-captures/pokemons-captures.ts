import { Component, signal } from '@angular/core';
import { PokemonDumbComponent } from './pokemon/pokemon.dumb.component';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemons-captures',
  imports: [PokemonDumbComponent, CommonModule],
  templateUrl: './pokemons-captures.html',
  styleUrl: './pokemons-captures.css',
})
export class PokemonsCaptures {
  selectedIndex = 0;

  ListePokemons = signal( [

    // exemples — remplace les urls par tes assets réels
    { id: 1, name: 'Gengar', sprite: 'assets/gengar.png', types: ['Ténèbre', 'Spectre'] },
    { id: 2, name: 'Weezing', sprite: 'assets/weezing.png', types: ['Poison'] },
    { id: 3, name: 'Pikachu', sprite: 'assets/pikachu.png', types: ['Électrik'] },
    
    //-> appel vers CRUD pkms joueur
  ]);


}
