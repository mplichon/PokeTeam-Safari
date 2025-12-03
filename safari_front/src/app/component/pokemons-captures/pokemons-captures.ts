import { Component, OnInit, signal } from '@angular/core';
import { PokemonDumbComponent } from './pokemon/pokemon.dumb.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Pokemon } from '../../interface/pokemon.interface';
import { PokemonDetail } from './pokemon-detail/pokemon-detail';
import { JwtService } from '../../service/jwt-service';
import { PokemonCaptureService } from '../../service/pokemon-capture-service';

@Component({
  selector: 'app-pokemons-captures',
  imports: [PokemonDumbComponent, CommonModule, PokemonDetail],
  templateUrl: './pokemons-captures.html',
  styleUrl: './pokemons-captures.css',
})
export class PokemonsCaptures implements OnInit {

  userId: number | null = null;

  private baseUrl = 'https://pokebuildapi.fr/api/v1';

  constructor(private http: HttpClient, private jwtService: JwtService, private pokemonCaptureService: PokemonCaptureService) {}

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

  selectedPokemon = signal<Pokemon | null>(null);

 ngOnInit(): void {

  this.userId = this.jwtService.userId;

    if (this.userId == null) {
      console.error("Aucun userId dans le JWT");
      return;
    }

    forkJoin({
      allPokemons: this.getFirst151(),
      capturedIds: this.pokemonCaptureService.pokemonCaptureParIdParJoueur(this.userId)
    }).subscribe({
      next: ({ allPokemons, capturedIds }) => {
        const capturedSet = new Set(capturedIds);

        const adaptedList = allPokemons.map(p => {
          if (capturedSet.has(p.id)) {
            // Pokémon capturé → on garde toutes les infos
            return p;
          }

          // Pokémon non capturé → on garde seulement l'id, le reste vide
          return {
            ...p,
            name: '-----',
            sprite: 'assets/pokeitem.png',
            types: [],
          };
        });

        this.ListePokemons.set(adaptedList);

       if (adaptedList.length > 0) {
        this.selectedPokemon.set(adaptedList[0]);
      }
    },

    
      error: err => {
        console.error('Erreur lors du chargement des pokémons ou des captures', err);
      }
    });
  
  }

  onPokemonSelected(pokemon: Pokemon): void {
    this.selectedPokemon.set(pokemon);
  }

previousPokemon(): void {
  const list = this.ListePokemons();
  const current = this.selectedPokemon();

  if (!current) return;

  let index = list.findIndex(p => p.id === current.id);
  if (index > 0) {
    this.selectedPokemon.set(list[index - 1]);
  }
}

nextPokemon(): void {
  const list = this.ListePokemons();
  const current = this.selectedPokemon();

  if (!current) return;

  let index = list.findIndex(p => p.id === current.id);
  if (index < list.length - 1) {
    this.selectedPokemon.set(list[index + 1]);
  }
}

}
