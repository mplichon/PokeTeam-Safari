import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonDetail } from '../../interface/pokemon.interface';

@Component({
  selector: 'app-combat',
  imports: [],
  templateUrl: './combat.html',
  styleUrl: './combat.css',
})
export class Combat implements OnInit {

  //recuperer id pokemon avec le dto
  _id = 1


  pokemon: PokemonDetail = {
    id: 0,
    name: '',
    sprite: '',
    img: '',
    types: []
  };

  private baseUrl = 'https://pokebuildapi.fr/api/v1/pokemon';

  constructor(private http: HttpClient) {}

  getPokemon(id: number): Observable<PokemonDetail> {
    return this.http.get<any>(`${this.baseUrl}/`+ id).pipe(
      map((p) => ({
          id: p.id,
          name: p.name,
          sprite: p.sprite,               // correspond à 96x96
          img: p.image,                   // correspond à l'image complète
          types: p.apiTypes?.map((t : { name: string }) => t.name) ?? []
        }))
      )
  }
  ngOnInit(): void {

    //aller chercher l'id du pokemon
    //this.id=??

    this.getPokemon(this._id).subscribe({
      next: (p) => {
        this.pokemon = p;
        console.log('Pokemon chargé :', p);
      },
      error: err => console.error('Erreur API Pokémon', err)
    });
    }
  
}
