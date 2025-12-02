import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RencontreDto } from '../dto/rencontre-dto';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
// import { PokemonDto } from '../dto/pokemon-dto'; // si existant

@Injectable({
  providedIn: 'root',
})
export class RencontrePokemonService {

  private apiUrl: string = '/rencontre';

  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<RencontreDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.http.get<RencontreDto[]>(this.apiUrl))
    );
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<RencontreDto> {
    return this.http.get<RencontreDto>(`${this.apiUrl}/${id}`);
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }
}
