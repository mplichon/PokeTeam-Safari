import { Component, signal } from '@angular/core';
import { PokemonDumbComponent } from './pokemon/pokemon.dumb.component';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-pokemons-captures',
  imports: [PokemonDumbComponent, CommonModule],
  templateUrl: './pokemons-captures.html',
  styleUrl: './pokemons-captures.css',
})
export class PokemonsCaptures {

  private baseUrl = 'https://pokebuildapi.fr/api/v1';

  constructor(private http: HttpClient) {}

  getFirst151(): Observable<Pokemon[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pokemon/limit/151`).pipe(
      map((response) =>
        response.map((p) => ({
          id: p.id,
          name: p.name,
          sprite: p.sprite,               // correspond à 96x96
          types: p.apiTypes?.map((t : { name: string }) => t.name) ?? []
        }))
      )
    );
  }



  ListePokemons = signal( [

    // exemples — remplace les urls par tes assets réels
    { id: 1, name: 'Gengar', sprite: 'assets/gengar.png', types: ['Ténèbre', 'Spectre'] },
    { id: 2, name: 'Weezing', sprite: 'assets/weezing.png', types: ['Poison'] },
    { id: 3, name: 'Pikachu', sprite: 'assets/pikachu.png', types: ['Électrik'] },
    
    //-> appel vers CRUD pkms joueur
  ]);


}
