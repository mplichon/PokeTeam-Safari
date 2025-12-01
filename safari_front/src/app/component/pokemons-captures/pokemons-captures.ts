import { Component, OnInit, signal } from '@angular/core';
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
export class PokemonsCaptures implements OnInit {

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



  ListePokemons = signal<Pokemon[]>([]);

 ngOnInit(): void {
    this.getFirst151().subscribe((list) => {
      this.ListePokemons.set(list);
    });
  }
}
