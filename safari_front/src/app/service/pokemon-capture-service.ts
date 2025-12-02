import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { PokemonCaptureDto } from '../dto/pokemon-capture-dto';


@Injectable({
 providedIn: 'root',
 })
 export class PokemonCaptureService {

   private apiUrl: string = '/api/pokemon-capture';
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
}
