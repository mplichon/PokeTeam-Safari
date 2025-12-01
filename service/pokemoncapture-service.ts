import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { PokemoncaptureDto } from '../dto/pokemoncapture-dto';

@Injectable({
  providedIn: 'root',
})
export class PokemoncaptureService {
  private apiUrl: string = '/pokemoncapture';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<PokemoncaptureDto[]> {
    return this.refresh$.pipe( // permet de transformer un flux / manipuler un flux
      // Forcer un premier chargement
      startWith(null),

      // Transformer le "void" que MatiereDto[] en allant chercher les informations
      switchMap(() => {
        return this.http.get<PokemoncaptureDto[]>(this.apiUrl);
      })
    );
  }

  public refresh() {
    this.refresh$.next(); // Permet d'envoyer des nouvelles infos
  }

  public findById(id: number): Observable<PokemoncaptureDto> {
    return this.http.get<PokemoncaptureDto>(`${ this.apiUrl }/${ id }`);
  }

  public save(pokemoncaptureDto: PokemoncaptureDto): void {
    const payload = pokemoncaptureDto.toJson();

    if (!pokemoncaptureDto.id) {
      this.http.post<PokemoncaptureDto>(this.apiUrl, payload).subscribe(() => this.refresh());
    }
    else{
    this.http.put<PokemoncaptureDto>(`${ this.apiUrl }/${ pokemoncaptureDto.id }`, payload).subscribe(() => this.refresh());
  }
  }
  public deleteById(id: number): void {
    this.http.delete<void>(`${ this.apiUrl }/${ id }`).subscribe(() => this.refresh());
  }
}
