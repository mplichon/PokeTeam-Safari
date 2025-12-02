import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonDetail } from '../../interface/pokemon.interface';
import { CommonModule } from '@angular/common';

type CombatStatus = 'fuite' | 'capture' | 'continue' | 'abandon';

@Component({
  selector: 'app-combat',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './combat.html',
  styleUrl: './combat.css',
})
export class Combat implements OnInit {

  _id = 1;

  pokemon: PokemonDetail = {
    id: 0,
    name: '',
    sprite: '',
    img: '',
    type1: '',
    type2: ''
  };

  combatStatus: CombatStatus = 'continue'; // statut par défaut
  idRencontre!: number;

  private baseUrl = 'https://pokebuildapi.fr/api/v1/pokemon';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this._id = Math.floor(Math.random() * 151) + 1;
    this.getPokemon(this._id).subscribe({
      next: (p) => this.pokemon = p,
      error: (err) => console.error('Erreur API Pokémon', err)
    });
      this.initRencontre();

  }

  getPokemon(id: number): Observable<PokemonDetail> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(p => {
        const types = p.apiTypes?.map((t: { name: string }) => t.name) ?? [];
        return {
          id: p.id,
          name: p.name,
          sprite: p.sprite,
          img: p.image,
          type1: types[0] ?? '',
          type2: types[1] ?? null
        };
      })
    );
  }

  // Appel API selon l'action choisie

  initRencontre() {
  this.http.get<{idRencontre: number, idPokemon: number, nom: string}>('/api/rencontre/initialiser')
    .subscribe(res => {
      this.idRencontre = res.idRencontre;
      console.log('Rencontre initialisée avec id', this.idRencontre);
    });
}

pokeball() {
  this.http.get<{status: string}>(`/api/rencontre/pokeball/${this.idRencontre}`)
    .subscribe(res => this.combatStatus = res.status as any);
}

appat() {
  this.http.get<{status: string}>(`/api/rencontre/appat/${this.idRencontre}`)
    .subscribe(res => this.combatStatus = res.status as any);
}

boue() {
  this.http.get<{status: string}>(`/api/rencontre/boue/${this.idRencontre}`)
    .subscribe(res => this.combatStatus = res.status as any);
}

fuite() {
  this.http.get<{status: string}>(`/api/rencontre/fuir/${this.idRencontre}`)
    .subscribe(res => this.combatStatus = res.status as any);
}

  private handleStatus(status: CombatStatus) {
    this.combatStatus = status;
    console.log('Nouveau statut:', status);
  }
}