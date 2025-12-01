import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { PokemonDto } from '../dto/pokemon-dto'; // si existant

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  private apiUrl: string = '/api/pokemon-capture';

  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<PokemonDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.http.get<PokemonDto[]>(this.apiUrl))
    );
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<PokemonDto> {
    return this.http.get<PokemonDto>(`${this.apiUrl}/${id}`);
  }

  public save(pokemonDto: PokemonDto): void {
    const payload = pokemonDto.toJson();

    if (!pokemonDto.id) {
      this.http.post<PokemonDto>(this.apiUrl, payload)
        .subscribe(() => this.refresh());
    }
    else {
      this.http.put<PokemonDto>(`${this.apiUrl}/${pokemonDto.id}`, payload)
        .subscribe(() => this.refresh());
    }
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }
}
