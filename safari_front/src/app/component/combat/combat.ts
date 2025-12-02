import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonDetail } from '../../interface/pokemon.interface';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../service/jwt-service';

type CombatStatus = 'fuite' | 'capture' | 'continue' | 'abandon';

@Component({
  selector: 'app-combat',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './combat.html',
  styleUrl: './combat.css',
})
export class Combat implements OnInit {

  

  username = 0; 
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

  constructor(private http: HttpClient,private jwtService: JwtService) {}
  

  ngOnInit(): void {
    this.initRencontre();
    //this._id = Math.floor(Math.random() * 151) + 1;

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
  this.username = this.jwtService.userId ?? 0;
  this.http.get<{idRencontre: number, idPokemon: number, nom: string}>('http://localhost:8080/api/rencontre/initialiser/' + this.username)
    .subscribe(res => {
      this.idRencontre = res.idRencontre;
      this.getPokemon(res.idPokemon).subscribe({
      next: (p) => this.pokemon = p,
      error: (err) => console.error('Erreur API Pokémon', err)
    });
      console.log('Rencontre initialisée avec id', this.idRencontre);
    });
}

pokeball() {
  this.http.get<{statut: string}>(`http://localhost:8080/api/rencontre/pokeball/${this.idRencontre}`)
    .subscribe(res => this.combatStatus = res.statut as any);
}

appat() {
  this.http.get<{statut: string}>(`http://localhost:8080/api/rencontre/appat/${this.idRencontre}`)
    .subscribe(res => this.combatStatus = res.statut as any);
}

boue() {
  this.http.get<{statut: string}>(`http://localhost:8080/api/rencontre/boue/${this.idRencontre}`)
    .subscribe(res => this.combatStatus = res.statut as any);
}

fuite() {
  this.http.get<{statut: string}>(`http://localhost:8080/api/rencontre/fuir/${this.idRencontre}`)
    .subscribe(res => this.combatStatus = res.statut as any);
}

  private handleStatus(statut: CombatStatus) {
    this.combatStatus = statut;
    console.log('Nouveau statut:', statut);
  }
}