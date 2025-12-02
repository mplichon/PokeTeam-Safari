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
    type1: '',
    type2: ''
  };

  private baseUrl = 'https://pokebuildapi.fr/api/v1/pokemon';

  constructor(private http: HttpClient) {}

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
  ngOnInit(): void {

    //aller chercher l'id du pokemon
    this._id=Math.floor(Math.random() * 151) + 1
    console.log(this._id);

    this.getPokemon(this._id).subscribe({
      next: (p) => {
        this.pokemon = p;
        console.log('Pokemon chargé :', p);
      },
      error: err => console.error('Erreur API Pokémon', err)
    });
    }
  
}
