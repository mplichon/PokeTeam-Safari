import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PokemonCaptureDto } from '../dto/pokemon-capture-dto';


@Injectable({
 providedIn: 'root',
 })
 export class PokemonCaptureService {

   private apiUrl: string = '/pokemon-capture';
   private refresh$: Subject<void> = new Subject<void>();

   constructor(private http: HttpClient) { }

   public findAll(): Observable<PokemonCaptureDto[]> {
     return this.refresh$.pipe(
       startWith(null),
       switchMap(() => this.http.get<PokemonCaptureDto[]>(this.apiUrl))
    );
   }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<PokemonCaptureDto> {
    return this.http.get<PokemonCaptureDto>(`${this.apiUrl}/${id}`);
  }

  public save(pokemoncaptureDto: PokemonCaptureDto): void {
    const payload = pokemoncaptureDto.toJson();

    if (!pokemoncaptureDto.id) {
      this.http.post<PokemonCaptureDto>(this.apiUrl, payload)
        .subscribe(() => this.refresh());
    } else {
      this.http.put<PokemonCaptureDto>(`${this.apiUrl}/${pokemoncaptureDto.id}`, payload)
        .subscribe(() => this.refresh());
    }
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }

  public pokemonCaptureParIdParJoueur(id: number): Observable<number[]> {
    return this.http.
        get<PokemonCaptureDto[]>(`${this.apiUrl}/joueur/${id}`)
        .pipe(
            map(list =>
            [...new Set(list.map(p => p.id))]
            )
        )
  }

  public verificationJoueurPokemon(idJoueur: number, idPokemon: number): Observable<boolean> {
    // La fonction vérifie si un joueur a déjà capturé un pokémon en particulier
    const idsPokemonsCaptures$: Observable<number[]> = this.pokemonCaptureParIdParJoueur(idJoueur);
    const estCapture$: Observable<boolean> = idsPokemonsCaptures$.pipe(
      map(ids => ids.includes(idPokemon))
    );
    return estCapture$;
  }
}
